"use client";

import { authClient } from "@/lib/auth-client";
import { getStackClientApp } from "@/lib/stack-client";
import { getAuthProvider } from "@/lib/auth-config";

export interface UnifiedClientSessionUser {
  id: string;
  email?: string | null;
  name?: string | null;
  image?: string | null;
}

export interface UnifiedClientSession {
  user: UnifiedClientSessionUser | null;
  isPending: boolean;
}

/**
 * Universal client-side sign out supporting Better Auth and Stack Auth
 */
export async function unifiedSignOut(callbackUrl = "/login"): Promise<void> {
  const provider = getAuthProvider();

  if (provider === "stack") {
    const stack = getStackClientApp();
    if (stack) {
      const user = await stack.getUser();
      if (user) {
        await user.signOut();
      }
    }
    window.location.href = callbackUrl;
    return;
  }

  // Better Auth sign out
  await authClient.signOut({
    fetchOptions: {
      onSuccess: () => {
        window.location.href = callbackUrl;
      },
      onError: () => {
        window.location.href = callbackUrl;
      },
    },
  });
}
