"use client";

import { StackClientApp } from "@stackframe/stack";

let stackClientAppInstance: StackClientApp | null = null;

export function getStackClientApp(): StackClientApp | null {
  if (typeof window === "undefined") return null;

  const projectId =
    process.env.NEXT_PUBLIC_STACK_PROJECT_ID ||
    process.env.NEXT_PUBLIC_HEXCLAVE_PROJECT_ID;
  const publishableClientKey =
    process.env.NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY ||
    process.env.NEXT_PUBLIC_HEXCLAVE_PUBLISHABLE_CLIENT_KEY;

  if (!projectId) {
    return null;
  }

  if (!stackClientAppInstance) {
    stackClientAppInstance = new StackClientApp({
      tokenStore: "nextjs-cookie",
      projectId,
      ...(publishableClientKey ? { publishableClientKey } : {}),
      urls: {
        signIn: "/login",
        signUp: "/signup",
        afterSignIn: "/workflows",
        afterSignUp: "/workflows",
      },
    });
  }

  return stackClientAppInstance;
}
