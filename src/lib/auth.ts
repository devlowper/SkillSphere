import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/skillsphere";

// Singleton MongoClient for Next.js (avoids "too many connections" in dev)
const globalWithMongo = globalThis as typeof globalThis & {
  _mongoClientPromise?: Promise<MongoClient>;
  _mongoClient?: MongoClient;
};

if (!globalWithMongo._mongoClient) {
  globalWithMongo._mongoClient = new MongoClient(uri);
  globalWithMongo._mongoClientPromise = globalWithMongo._mongoClient.connect();
}

const client = globalWithMongo._mongoClient;
const clientPromise = globalWithMongo._mongoClientPromise;
const db = client.db("skillsphere");

export const auth = betterAuth({
  database: mongodbAdapter(db),
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
