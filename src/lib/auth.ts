import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI as string);
const db = client.db();

export const auth = betterAuth({
  database: {
    db: db,
    type: "mongodb",
  },
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
