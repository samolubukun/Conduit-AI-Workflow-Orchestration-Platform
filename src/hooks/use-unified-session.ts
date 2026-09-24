"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { getAuthProvider } from "@/lib/auth-config";
import { getStackClientApp } from "@/lib/stack-client";

interface SessionUser {
  id?: string;
  email?: string | null;
  name?: string | null;
  image?: string | null;
}

interface UnifiedSession {
  user: SessionUser | null;
  isPending: boolean;
}

/**
 * Universal client-side session hook supporting both Better Auth and Stack Auth.
 */
export function useUnifiedSession(): { session: UnifiedSession } {
  const provider = getAuthProvider();

  // Better Auth path — use its built-in hook
  const betterAuthSession = authClient.useSession();

  const [stackSession, setStackSession] = useState<UnifiedSession>({
    user: null,
    isPending: true,
  });

  useEffect(() => {
    if (provider !== "stack") return;
    const app = getStackClientApp();
    if (!app) {
      setStackSession({ user: null, isPending: false });
      return;
    }
    app.getUser().then((user) => {
      if (user) {
        setStackSession({
          user: {
            id: user.id,
            email: user.primaryEmail ?? null,
            name: user.displayName ?? null,
            image: user.profileImageUrl ?? null,
          },
          isPending: false,
        });
      } else {
        setStackSession({ user: null, isPending: false });
      }
    });
  }, [provider]);

  if (provider === "stack") {
    return { session: stackSession };
  }

  return {
    session: {
      user: betterAuthSession.data?.user
        ? {
            id: betterAuthSession.data.user.id,
            email: betterAuthSession.data.user.email ?? null,
            name: betterAuthSession.data.user.name ?? null,
            image: betterAuthSession.data.user.image ?? null,
          }
        : null,
      isPending: betterAuthSession.isPending,
    },
  };
}
