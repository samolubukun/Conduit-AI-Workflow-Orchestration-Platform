import { redirect } from "next/navigation";
import { getUnifiedSession, type UnifiedAuthSession } from "./auth-session";

export const requireAuth = async (): Promise<UnifiedAuthSession> => {
  const session = await getUnifiedSession();

  if (!session) {
    redirect("/login");
  }

  return session;
};

export const requireUnauth = async (): Promise<void> => {
  const session = await getUnifiedSession();

  if (session) {
    redirect("/workflows");
  }
};
