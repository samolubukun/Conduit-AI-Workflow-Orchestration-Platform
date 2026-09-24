import { stackServerApp } from "./stack-auth";
import { auth } from "./auth";
import { isStackAuth } from "./auth-config";
import db from "@/server/db";
import { users } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";

export interface UnifiedAuthUser {
  id: string;
  email: string;
  name: string;
  image?: string | null;
}

export interface UnifiedAuthSession {
  user: UnifiedAuthUser;
  provider: "better-auth" | "stack";
}

/**
 * Sync user profile to Neon PostgreSQL `users` table so credit tracking,
 * workflows, and relational constraints work seamlessly across both providers.
 */
export async function ensureUserInDatabase(user: UnifiedAuthUser): Promise<void> {
  try {
    const existing = await db.query.users.findFirst({
      where: eq(users.id, user.id),
      columns: { id: true },
    });

    if (!existing) {
      await db
        .insert(users)
        .values({
          id: user.id,
          name: user.name || user.email.split("@")[0] || "User",
          email: user.email,
          emailVerified: true,
          image: user.image ?? null,
          credits: 50, // 50 complimentary free credits for all new users
        })
        .onConflictDoNothing();
    }
  } catch (error) {
    console.error("[AuthAdapter] Error syncing user to database:", error);
  }
}

/**
 * Get unified session based on active AUTH_PROVIDER
 */
export async function getUnifiedSession(): Promise<UnifiedAuthSession | null> {
  if (isStackAuth()) {
    try {
      const stackUser = await stackServerApp.getUser();
      if (!stackUser) return null;

      const unifiedUser: UnifiedAuthUser = {
        id: stackUser.id,
        email: stackUser.primaryEmail ?? `${stackUser.id}@stackauth.user`,
        name: stackUser.displayName ?? stackUser.primaryEmail?.split("@")[0] ?? "Stack User",
        image: stackUser.profileImageUrl ?? null,
      };

      await ensureUserInDatabase(unifiedUser);

      return {
        user: unifiedUser,
        provider: "stack",
      };
    } catch (err) {
      console.error("[AuthAdapter] Stack Auth session error:", err);
      return null;
    }
  }

  // Better Auth flow
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session || !session.user) return null;

    return {
      user: {
        id: session.user.id,
        email: session.user.email,
        name: session.user.name,
        image: session.user.image,
      },
      provider: "better-auth",
    };
  } catch (err) {
    console.error("[AuthAdapter] Better Auth session error:", err);
    return null;
  }
}
