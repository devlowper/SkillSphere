import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI || (process.env.NODE_ENV === "development" ? "mongodb://127.0.0.1:27017/skillsphere" : undefined);

if (!uri) {
  throw new Error("❌ MONGODB_URI IS MISSING IN VERCEL ENVIRONMENT VARIABLES!");
}

// Singleton MongoClient for Next.js
const globalWithMongo = globalThis as typeof globalThis & {
  _mongoClientPromise?: Promise<MongoClient>;
  _mongoClient?: MongoClient;
};

if (!globalWithMongo._mongoClient) {
  globalWithMongo._mongoClient = new MongoClient(uri);
  globalWithMongo._mongoClientPromise = globalWithMongo._mongoClient.connect().catch(err => {
    // If it fails to connect, clear the cache so it can try again next time!
    globalWithMongo._mongoClient = undefined;
    globalWithMongo._mongoClientPromise = undefined;
    throw err;
  });
}

const client = globalWithMongo._mongoClient;
const clientPromise = globalWithMongo._mongoClientPromise;
const db = client.db("skillsphere");

export const auth = betterAuth({
  database: mongodbAdapter(db),
  secret: process.env.BETTER_AUTH_SECRET || "skillsphere_dev_secret_change_in_production_xyz123",
  baseURL: process.env.BETTER_AUTH_URL || (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : undefined),
  trustedOrigins: ["https://skill-sphere-snowy.vercel.app", "http://localhost:3000"],
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 6,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
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

export { clientPromise };
