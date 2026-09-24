import { getUnifiedSession } from '@/lib/auth-session';
import db from '@/server/db';
import { users } from '@/server/db/schema';
import { initTRPC, TRPCError } from '@trpc/server';
import { cache } from 'react';
import superjson from "superjson";
import { eq } from 'drizzle-orm';

export const createTRPCContext = cache(async () => {
  return { userId: 'user_123' };
});

const t = initTRPC.create({
  transformer: superjson,
});

export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;
export const baseProcedure = t.procedure;

export const protectedProcedure = baseProcedure.use(async ({ ctx, next }) => {
  const session = await getUnifiedSession();

  if (!session) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Unauthorized",
    });
  }

  // Fetch current user wallet / credits
  const user = await db.query.users.findFirst({
    where: eq(users.id, session.user.id),
    columns: {
      id: true,
      credits: true,
      email: true,
      name: true,
    },
  });

  return next({
    ctx: {
      ...ctx,
      auth: session,
      userCredits: user?.credits ?? 0,
    },
  });
});

/**
 * creditProcedure: Requires user to have at least `requiredCredits` (default 1)
 */
export const creditProcedure = (requiredCredits = 1) =>
  protectedProcedure.use(async ({ ctx, next }) => {
    if (ctx.userCredits < requiredCredits) {
      throw new TRPCError({
        code: "FORBIDDEN",
        message: `Insufficient credits. This operation requires ${requiredCredits} credit(s). You currently have ${ctx.userCredits}.`,
      });
    }

    return next({ ctx: { ...ctx, requiredCredits } });
  });

// Backward compatibility alias for any existing code referencing premiumProcedure
export const premiumProcedure = creditProcedure(1);
