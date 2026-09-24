ALTER TYPE "public"."NodeType" ADD VALUE IF NOT EXISTS 'WEBHOOK_TRIGGER';--> statement-breakpoint
ALTER TYPE "public"."NodeType" ADD VALUE IF NOT EXISTS 'SCHEDULE_TRIGGER';--> statement-breakpoint
ALTER TYPE "public"."NodeType" ADD VALUE IF NOT EXISTS 'GITHUB_TRIGGER';
