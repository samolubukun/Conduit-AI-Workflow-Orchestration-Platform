CREATE TYPE "public"."CredentialType" AS ENUM('OPENAI', 'ANTHROPIC', 'GEMINI');--> statement-breakpoint
CREATE TYPE "public"."ExecutionStatus" AS ENUM('RUNNING', 'SUCCESS', 'FAILED');--> statement-breakpoint
CREATE TYPE "public"."NodeType" AS ENUM('INITIAL', 'MANUAL_TRIGGER', 'HTTP_REQUEST', 'GOOGLE_FORM_TRIGGER', 'STRIPE_TRIGGER', 'ANTHROPIC', 'GEMINI', 'OPENAI', 'DISCORD', 'SLACK');--> statement-breakpoint
CREATE TABLE "account" (
	"id" text PRIMARY KEY NOT NULL,
	"accountId" text NOT NULL,
	"providerId" text NOT NULL,
	"userId" text NOT NULL,
	"accessToken" text,
	"refreshToken" text,
	"idToken" text,
	"accessTokenExpiresAt" timestamp,
	"refreshTokenExpiresAt" timestamp,
	"scope" text,
	"password" text,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "session" (
	"id" text PRIMARY KEY NOT NULL,
	"expiresAt" timestamp NOT NULL,
	"token" text NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"ipAddress" text,
	"userAgent" text,
	"userId" text NOT NULL,
	CONSTRAINT "session_token_unique" UNIQUE("token")
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"emailVerified" boolean DEFAULT false NOT NULL,
	"image" text,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "verification" (
	"id" text PRIMARY KEY NOT NULL,
	"identifier" text NOT NULL,
	"value" text NOT NULL,
	"expiresAt" timestamp NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "Connection" (
	"id" text PRIMARY KEY NOT NULL,
	"workflowId" text NOT NULL,
	"fromNodeId" text NOT NULL,
	"toNodeId" text NOT NULL,
	"fromOutput" text DEFAULT 'main' NOT NULL,
	"toInput" text DEFAULT 'main' NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "Connection_unique" UNIQUE("fromNodeId","toNodeId","fromOutput","toInput")
);
--> statement-breakpoint
CREATE TABLE "Credential" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"value" text NOT NULL,
	"type" "CredentialType" NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"userId" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "Execution" (
	"id" text PRIMARY KEY NOT NULL,
	"workflowId" text NOT NULL,
	"status" "ExecutionStatus" DEFAULT 'RUNNING' NOT NULL,
	"error" text,
	"errorStack" text,
	"startedAt" timestamp DEFAULT now() NOT NULL,
	"completedAt" timestamp,
	"inngestEventId" text NOT NULL,
	"output" jsonb,
	CONSTRAINT "Execution_inngestEventId_unique" UNIQUE("inngestEventId")
);
--> statement-breakpoint
CREATE TABLE "Node" (
	"id" text PRIMARY KEY NOT NULL,
	"workflowId" text NOT NULL,
	"name" text NOT NULL,
	"type" "NodeType" NOT NULL,
	"position" jsonb NOT NULL,
	"data" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"credentialId" text,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "Workflow" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"userId" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "account" ADD CONSTRAINT "account_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "session" ADD CONSTRAINT "session_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Connection" ADD CONSTRAINT "Connection_workflowId_Workflow_id_fk" FOREIGN KEY ("workflowId") REFERENCES "public"."Workflow"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Connection" ADD CONSTRAINT "Connection_fromNodeId_Node_id_fk" FOREIGN KEY ("fromNodeId") REFERENCES "public"."Node"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Connection" ADD CONSTRAINT "Connection_toNodeId_Node_id_fk" FOREIGN KEY ("toNodeId") REFERENCES "public"."Node"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Credential" ADD CONSTRAINT "Credential_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Execution" ADD CONSTRAINT "Execution_workflowId_Workflow_id_fk" FOREIGN KEY ("workflowId") REFERENCES "public"."Workflow"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Node" ADD CONSTRAINT "Node_workflowId_Workflow_id_fk" FOREIGN KEY ("workflowId") REFERENCES "public"."Workflow"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Node" ADD CONSTRAINT "Node_credentialId_Credential_id_fk" FOREIGN KEY ("credentialId") REFERENCES "public"."Credential"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Workflow" ADD CONSTRAINT "Workflow_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;