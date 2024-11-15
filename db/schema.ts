import { pgTable, text, timestamp, serial, integer } from "drizzle-orm/pg-core";

import { relations } from "drizzle-orm";

export const accounts = pgTable("accounts", {
  id: serial("id").primaryKey(),
  walletAddress: text("wallet_address").unique(), // Add unique constraint
  email: text("email").notNull().unique(),
  password: text("password"),
  createdAt: timestamp("created_at", { withTimezone: true, mode: "string" })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true, mode: "string" })
    .defaultNow()
    .notNull(),
});

export const beneficiaries = pgTable("beneficiaries", {
  id: serial("id").primaryKey(),
  email: text("email").notNull(),
  trustPercentage: text("trust_percentage"),
  relationship: text("relationship"),
  phoneNumber: text("phone_number"),
  accountId: integer("account_id"), // Optionally keep accountId
  accountWalletAddress: text("accountWalletAddress"),
  createdAt: timestamp("created_at", { withTimezone: true, mode: "string" })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true, mode: "string" })
    .defaultNow()
    .notNull(),
});

// Create relationships
export const usersRelations = relations(accounts, ({ many }) => ({
  beneficiaries: many(beneficiaries),
}));
