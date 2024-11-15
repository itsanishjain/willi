ALTER TABLE "accounts" ALTER COLUMN "password" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "beneficiaries" ALTER COLUMN "trust_percentage" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "beneficiaries" ALTER COLUMN "trust_percentage" DROP NOT NULL;