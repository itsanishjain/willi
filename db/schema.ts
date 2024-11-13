import { pgTable, text, timestamp, varchar, json } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  walletId: varchar("wallet_id").primaryKey().notNull(),
  username: varchar("username").unique(),
  email: varchar("email").unique(),
  password: varchar("password"),
  walletAddress: varchar("wallet_address"),
  role: varchar("role").default("user"), // user, admin
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  bio: text("bio"),
  location: varchar("location"),
  timezone: varchar("timezone"),
  profilePictureUrl: varchar("profile_picture_url"),
  socialLinks: json("social_links"),
  createdAt: timestamp("created_at", { withTimezone: true, mode: "string" })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true, mode: "string" })
    .defaultNow()
    .notNull(),
});
