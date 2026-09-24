import db from "@/server/db";
import {
  paymentIntents,
  creditTransactions,
  users,
  CreditTransactionType,
  PaymentIntentStatus,
} from "@/server/db/schema";
import { eq, sql } from "drizzle-orm";
import {
  CheckoutSessionParams,
  CheckoutSessionResult,
  PaymentGateway,
} from "../types";
import { createId } from "@paralleldrive/cuid2";

/**
 * MockPaymentGateway:
 * Allows developers and users to simulate purchasing credits locally
 * or in preview environments without needing active live provider API keys.
 *
 * When adding Stripe, LemonSqueezy, or Razorpay, create a class implementing
 * PaymentGateway (e.g. StripePaymentGateway) and register it in index.ts.
 */
export class MockPaymentGateway implements PaymentGateway {
  name = "mock";

  async createCheckoutSession(
    params: CheckoutSessionParams
  ): Promise<CheckoutSessionResult> {
    const intentId = createId();

    // Record the pending intent
    await db.insert(paymentIntents).values({
      id: intentId,
      userId: params.userId,
      provider: this.name,
      externalIntentId: `mock_pi_${intentId}`,
      creditsPurchased: params.credits,
      amountInCents: params.amountInCents,
      currency: "USD",
      status: PaymentIntentStatus.PENDING,
    });

    return {
      checkoutUrl: `/checkout/mock?intentId=${intentId}&returnUrl=${encodeURIComponent(
        params.returnUrl
      )}`,
      intentId,
      provider: this.name,
    };
  }

  async completePayment(intentId: string): Promise<boolean> {
    const intent = await db.query.paymentIntents.findFirst({
      where: eq(paymentIntents.id, intentId),
    });

    if (!intent || intent.status === PaymentIntentStatus.COMPLETED) {
      return false;
    }

    await db.transaction(async (tx) => {
      // 1. Mark intent completed
      await tx
        .update(paymentIntents)
        .set({
          status: PaymentIntentStatus.COMPLETED,
          updatedAt: new Date(),
        })
        .where(eq(paymentIntents.id, intentId));

      // 2. Add credits to user
      await tx
        .update(users)
        .set({
          credits: sql`${users.credits} + ${intent.creditsPurchased}`,
          updatedAt: new Date(),
        })
        .where(eq(users.id, intent.userId));

      // 3. Log credit transaction
      await tx.insert(creditTransactions).values({
        userId: intent.userId,
        amount: intent.creditsPurchased,
        type: CreditTransactionType.PURCHASE,
        description: `Purchased ${intent.creditsPurchased} Credits (Mock Gateway)`,
        referenceId: intentId,
      });
    });

    return true;
  }
}
