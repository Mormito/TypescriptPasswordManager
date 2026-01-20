import { pgTable, text, uuid, varchar } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  user: varchar({length: 200}).notNull(),
  email: varchar({length: 254}).unique().notNull(),
  passwordHash: text().notNull(),
});

export const passwordsTable = pgTable("passwords", {
  id: uuid("id").defaultRandom().primaryKey(),
  site: varchar({length: 300}).notNull(),
  user: varchar({length: 200}).notNull(),
  encryptedPassword: varchar({length: 500}).notNull(),

  userId: uuid("user_id")
    .notNull()
    .references(() => usersTable.id, {
      onDelete: "cascade",
    }),
});