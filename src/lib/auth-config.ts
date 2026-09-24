/**
 * Auth Provider Configuration
 * Allows switching between 'better-auth' (default) and 'stack' (Stack Auth) via environment variables.
 */

export type AuthProviderType = "better-auth" | "stack";

export const getAuthProvider = (): AuthProviderType => {
  const provider = (process.env.NEXT_PUBLIC_AUTH_PROVIDER || process.env.AUTH_PROVIDER || "better-auth").toLowerCase();
  return provider === "stack" ? "stack" : "better-auth";
};

export const isStackAuth = (): boolean => getAuthProvider() === "stack";
export const isBetterAuth = (): boolean => getAuthProvider() === "better-auth";
