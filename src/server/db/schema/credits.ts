import {
  pgTable,
  text,
  timestamp,
  integer,
  pgEnum,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createId } from "@paralleldrive/cuid2";
import { users } from "./auth";

export const creditTransactionTypeEnum = pgEnum("CreditTransactionType", [
  "SIGNUP_BONUS",
  "PURCHASE",
  "WORKFLOW_CREATION",
  "WORKFLOW_EXECUTION",
  "REFUND",
  "ADMIN_ADJUSTMENT",
]);

export const paymentIntentStatusEnum = pgEnum("PaymentIntentStatus", [
  "PENDING",
  "COMPLETED",
  "FAILED",
  "CANCELLED",
]);

export type CreditTransactionType =
  (typeof creditTransactionTypeEnum.enumValues)[number];
export const CreditTransactionType = {
  SIGNUP_BONUS: "SIGNUP_BONUS" as const,
  PURCHASE: "PURCHASE" as const,
  WORKFLOW_CREATION: "WORKFLOW_CREATION" as const,
  WORKFLOW_EXECUTION: "WORKFLOW_EXECUTION" as const,
  REFUND: "REFUND" as const,
  ADMIN_ADJUSTMENT: "ADMIN_ADJUSTMENT" as const,
};

export type PaymentIntentStatus =
  (typeof paymentIntentStatusEnum.enumValues)[number];
export const PaymentIntentStatus = {
  PENDING: "PENDING" as const,
  COMPLETED: "COMPLETED" as const,
  FAILED: "FAILED" as const,
  CANCELLED: "CANCELLED" as const,
};

// Credit audit log / transactions
export const creditTransactions = pgTable("credit_transactions", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  amount: integer("amount").notNull(), // positive for add, negative for deduction
  type: creditTransactionTypeEnum("type").notNull(),
  description: text("description").notNull(),
  referenceId: text("referenceId"), // e.g. workflowId, executionId, intentId
  createdAt: timestamp("createdAt", { mode: "date" }).defaultNow().notNull(),
});

// Pluggable Payment intents / Top-up orders
export const paymentIntents = pgTable("payment_intents", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  provider: text("provider").default("mock").notNull(), // e.g. stripe, lemonsqueezy, razorpay, mock
  externalIntentId: text("externalIntentId"), // Provider's checkout/order ID
  creditsPurchased: integer("creditsPurchased").notNull(),
  amountInCents: integer("amountInCents").notNull(),
  currency: text("currency").default("USD").notNull(),
  status: paymentIntentStatusEnum("status").default("PENDING").notNull(),
  createdAt: timestamp("createdAt", { mode: "date" }).defaultNow().notNull(),
  updatedAt: timestamp("updatedAt", { mode: "date" }).defaultNow().notNull(),
});

export const creditTransactionsRelations = relations(
  creditTransactions,
  ({ one }) => ({
    user: one(users, {
      fields: [creditTransactions.userId],
      references: [users.id],
    }),
  })
);

export const paymentIntentsRelations = relations(
  paymentIntents,
  ({ one }) => ({
    user: one(users, {
      fields: [paymentIntents.userId],
      references: [users.id],
    }),
  })
);

export type CreditTransaction = typeof creditTransactions.$inferSelect;
export type NewCreditTransaction = typeof creditTransactions.$inferInsert;
export type PaymentIntent = typeof paymentIntents.$inferSelect;
export type NewPaymentIntent = typeof paymentIntents.$inferInsert;
