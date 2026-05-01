import { Suspense } from "react";
import LoginForm from "./LoginForm";

export const metadata = {
  title: "Login | SkillSphere",
  description: "Sign in to your SkillSphere account",
};

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-green-500" />
      </div>
    }>
      <LoginForm />
    </Suspense>
  );
}
