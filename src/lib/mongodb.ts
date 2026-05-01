import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI || (process.env.NODE_ENV === "development" ? "mongodb://127.0.0.1:27017/skillsphere" : undefined);
if (!uri) throw new Error("❌ MONGODB_URI IS MISSING!");

const globalWithMongo = globalThis as typeof globalThis & {
  _mongoClientPromise?: Promise<MongoClient>;
  _mongoClient?: MongoClient;
};

if (!globalWithMongo._mongoClientPromise) {
  const client = new MongoClient(uri);
  globalWithMongo._mongoClient = client;
  globalWithMongo._mongoClientPromise = client.connect().catch(err => {
    globalWithMongo._mongoClient = undefined;
    globalWithMongo._mongoClientPromise = undefined;
    throw err;
  });
}

const clientPromise: Promise<MongoClient> = globalWithMongo._mongoClientPromise;

export default clientPromise;
