import { createAuthClient } from "better-auth/react";

let baseURL = "http://localhost:3000";
if (process.env.NEXT_PUBLIC_BETTER_AUTH_URL) {
  baseURL = process.env.NEXT_PUBLIC_BETTER_AUTH_URL;
} else if (typeof window !== "undefined") {
  baseURL = window.location.origin;
}

export const authClient = createAuthClient({
  baseURL,
});

export const {
  signIn,
  signOut,
  signUp,
  useSession,
  updateUser,
} = authClient;
