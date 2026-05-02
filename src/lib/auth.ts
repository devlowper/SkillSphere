import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";

// ── Resolve connection URI ────────────────────────────────────────────────────
const uri =
  process.env.MONGODB_URI ||
  (process.env.NODE_ENV === "development"
    ? "mongodb://127.0.0.1:27017/skillsphere"
    : undefined);

if (!uri) {
  throw new Error(
    "❌ MONGODB_URI is missing from environment variables! Add it to .env.local"
  );
}

// ── Singleton MongoClient ─────────────────────────────────────────────────────
// Stored on globalThis so Next.js hot-reloads don't create extra connections.
const g = globalThis as typeof globalThis & {
  _mongoClient?: MongoClient;
};

if (!g._mongoClient) {
  g._mongoClient = new MongoClient(uri);
  // Connect eagerly — MongoDB driver queues operations until connected,
  // so this is safe to call without awaiting at module level.
  g._mongoClient.connect().catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    g._mongoClient = undefined; // Clear so next import retries
  });
}

const client = g._mongoClient;
const db = client.db("skillsphere");

// Export the client promise for other parts of the app (e.g. NextAuth helpers)
export const clientPromise: Promise<MongoClient> = client
  .connect()
  .catch(() => client); // already connected — returns immediately

// ── Google OAuth guard ────────────────────────────────────────────────────────
// Only enable Google if *real* credentials are provided.
// Placeholder values cause 403 "permission error" from Better Auth.
const googleClientId = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;
const hasGoogle =
  Boolean(googleClientId) &&
  Boolean(googleClientSecret) &&
  googleClientId !== "placeholder" &&
  googleClientSecret !== "placeholder";

// ── Better Auth ───────────────────────────────────────────────────────────────
export const auth = betterAuth({
  // Pass BOTH db and client — client is required for transactions
  database: mongodbAdapter(db, { client }),

  secret:
    process.env.BETTER_AUTH_SECRET ||
    "skillsphere_dev_secret_change_in_production_xyz123",

  baseURL:
    process.env.BETTER_AUTH_URL ||
    (process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000"),

  trustedOrigins: [
    "http://localhost:3000",
    "https://skill-sphere-snowy.vercel.app",
  ],

  emailAndPassword: {
    enabled: true,
    minPasswordLength: 6,
  },

  ...(hasGoogle && {
    socialProviders: {
      google: {
        clientId: googleClientId as string,
        clientSecret: googleClientSecret as string,
      },
    },
  }),

  user: {
    additionalFields: {
      photoURL: {
        type: "string",
        required: false,
        defaultValue: "",
      },
    },
  },
});
