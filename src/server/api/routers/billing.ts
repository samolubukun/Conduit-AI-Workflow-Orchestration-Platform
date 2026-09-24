import db from "@/server/db";
import {
  users,
  creditTransactions,
  paymentIntents,
  CreditTransactionType,
  PaymentIntentStatus,
} from "@/server/db/schema";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import z from "zod";
import { PAGINATION } from "@/config/constants";
import { eq, desc, count, sql } from "drizzle-orm";
import {
  CREDIT_PACKAGES,
  getPaymentGateway,
} from "@/server/billing";

export const billingRouter = createTRPCRouter({
  /**
   * Get user balance and packages
   */
  getBalance: protectedProcedure.query(async ({ ctx }) => {
    const user = await db.query.users.findFirst({
      where: eq(users.id, ctx.auth.user.id),
      columns: {
        credits: true,
      },
    });

    return {
      credits: user?.credits ?? 0,
      packages: CREDIT_PACKAGES,
    };
  }),

  /**
   * Get credit transaction ledger / history
   */
  getHistory: protectedProcedure
    .input(
      z.object({
        page: z.number().default(PAGINATION.DEFAULT_PAGE),
        pageSize: z
          .number()
          .min(PAGINATION.MIN_PAGE_SIZE)
          .max(PAGINATION.MAX_PAGE_SIZE)
          .default(PAGINATION.DEFAULT_PAGE_SIZE),
      })
    )
    .query(async ({ ctx, input }) => {
      const { page, pageSize } = input;
      const offset = (page - 1) * pageSize;

      const [items, [countResult]] = await Promise.all([
        db.query.creditTransactions.findMany({
          where: eq(creditTransactions.userId, ctx.auth.user.id),
          orderBy: [desc(creditTransactions.createdAt)],
          limit: pageSize,
          offset,
        }),
        db
          .select({ value: count() })
          .from(creditTransactions)
          .where(eq(creditTransactions.userId, ctx.auth.user.id)),
      ]);

      const totalCount = Number(countResult?.value ?? 0);
      const totalPages = Math.ceil(totalCount / pageSize);

      return {
        items,
        page,
        pageSize,
        totalCount,
        totalPages,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
      };
    }),

  /**
   * Create Checkout Session for top-up
   */
  createCheckout: protectedProcedure
    .input(
      z.object({
        packageId: z.string(),
        returnUrl: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const pkg = CREDIT_PACKAGES.find((p) => p.id === input.packageId);
      if (!pkg) {
        throw new Error("Invalid credit package selected");
      }

      const gateway = getPaymentGateway();
      const session = await gateway.createCheckoutSession({
        userId: ctx.auth.user.id,
        userEmail: ctx.auth.user.email,
        creditPackageId: pkg.id,
        credits: pkg.credits,
        amountInCents: pkg.priceInCents,
        returnUrl: input.returnUrl || "/workflows",
      });

      return session;
    }),

  /**
   * Complete payment (used by Mock gateway or checkout return page)
   */
  completeCheckout: protectedProcedure
    .input(z.object({ intentId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const gateway = getPaymentGateway();
      if (!gateway.completePayment) {
        throw new Error("Gateway does not support direct completion");
      }

      const success = await gateway.completePayment(input.intentId);
      return { success };
    }),
});
