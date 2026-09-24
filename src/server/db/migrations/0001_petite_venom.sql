CREATE TYPE "public"."CreditTransactionType" AS ENUM('SIGNUP_BONUS', 'PURCHASE', 'WORKFLOW_CREATION', 'WORKFLOW_EXECUTION', 'REFUND', 'ADMIN_ADJUSTMENT');--> statement-breakpoint
CREATE TYPE "public"."PaymentIntentStatus" AS ENUM('PENDING', 'COMPLETED', 'FAILED', 'CANCELLED');--> statement-breakpoint
CREATE TABLE "credit_transactions" (
	"id" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"amount" integer NOT NULL,
	"type" "CreditTransactionType" NOT NULL,
	"description" text NOT NULL,
	"referenceId" text,
	"createdAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "payment_intents" (
	"id" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"provider" text DEFAULT 'mock' NOT NULL,
	"externalIntentId" text,
	"creditsPurchased" integer NOT NULL,
	"amountInCents" integer NOT NULL,
	"currency" text DEFAULT 'USD' NOT NULL,
	"status" "PaymentIntentStatus" DEFAULT 'PENDING' NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "credits" integer DEFAULT 50 NOT NULL;--> statement-breakpoint
ALTER TABLE "credit_transactions" ADD CONSTRAINT "credit_transactions_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payment_intents" ADD CONSTRAINT "payment_intents_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;