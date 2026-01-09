import { integer, pgTable, uuid, varchar } from "drizzle-orm/pg-core";

export const passwordsTable = pgTable("password", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  site: varchar({length: 300}).notNull(),
  user: varchar({length: 200}).notNull(),
  password: varchar({length: 500}).notNull(),
});