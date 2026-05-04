import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";

// Resolve connection URI
const uri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/skillsphere";

if (!uri) {
  throw new Error("MONGODB_URI is missing from environment variables!");
}

// Singleton MongoClient
const g = globalThis as typeof globalThis & {
  _mongoClient?: MongoClient;
};

if (!g._mongoClient) {
  g._mongoClient = new MongoClient(uri);
  g._mongoClient.connect().catch((err) => {
    console.error("MongoDB connection error:", err);
    g._mongoClient = undefined;
  });
}

const client = g._mongoClient;
const db = client.db("skillsphere");

// Google OAuth config
const googleClientId = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;
const hasGoogle = Boolean(googleClientId) && Boolean(googleClientSecret) && googleClientId !== "placeholder";

export const auth = betterAuth({
  database: mongodbAdapter(db, { client }),

  emailAndPassword: {
    enabled: true,
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
