ALTER TABLE "beneficiaries" ADD COLUMN "accountWalletAddress" text;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "beneficiaries" ADD CONSTRAINT "beneficiaries_accountWalletAddress_accounts_wallet_address_fk" FOREIGN KEY ("accountWalletAddress") REFERENCES "public"."accounts"("wallet_address") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
