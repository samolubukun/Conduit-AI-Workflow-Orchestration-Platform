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

export const stackServerApp = new StackServerApp({
  tokenStore: "nextjs-cookie",
  ...(projectId ? { projectId } : {}),
  ...(publishableClientKey ? { publishableClientKey } : {}),
  ...(secretServerKey ? { secretServerKey } : {}),
  urls: {
    signIn: "/login",
    signUp: "/signup",
    afterSignIn: "/workflows",
    afterSignUp: "/workflows",
  },
});

