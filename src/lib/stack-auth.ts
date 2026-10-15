import { StackServerApp } from "@stackframe/stack";

const projectId =
  process.env.NEXT_PUBLIC_STACK_PROJECT_ID ||
  process.env.NEXT_PUBLIC_HEXCLAVE_PROJECT_ID;

const publishableClientKey =
  process.env.NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY ||
  process.env.NEXT_PUBLIC_HEXCLAVE_PUBLISHABLE_CLIENT_KEY;

const secretServerKey =
  process.env.STACK_SECRET_SERVER_KEY ||
  process.env.HEXCLAVE_SECRET_SERVER_KEY;

// Fallback valid UUID so Stack Auth validation passes when env vars are omitted
const FALLBACK_UUID = "00000000-0000-4000-8000-000000000000";

export const stackServerApp = new StackServerApp({
  tokenStore: "nextjs-cookie",
  projectId: projectId || FALLBACK_UUID,
  publishableClientKey: publishableClientKey || "pck_00000000000000000000000000000000",
  secretServerKey: secretServerKey || "ssk_00000000000000000000000000000000",
  urls: {
    signIn: "/login",
    signUp: "/signup",
    afterSignIn: "/workflows",
    afterSignUp: "/workflows",
  },
});

