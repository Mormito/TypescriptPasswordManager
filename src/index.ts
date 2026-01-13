import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { eq } from "drizzle-orm";

import { passwordsTable } from "./db/schema";
import { passwordInsertSchema, passwordUpdateSchema } from "./schema/password";

const sql = neon(process.env.DATABASE_URL!);

export const db = drizzle(sql);

export async function findAll() {
  return db.select().from(passwordsTable);
}

export async function findByID(id: number) {
  return db
    .select()
    .from(passwordsTable)
    .where(eq(passwordsTable.id, id));
}

export async function insertPassword(input: unknown) {
  const password = passwordInsertSchema.parse(input);

  await db.insert(passwordsTable).values(password);

  return { success: true };
}

export async function updatePassword(input: unknown) {
  const password = passwordUpdateSchema.parse(input);

  await db
    .update(passwordsTable)
    .set(password.data)
    .where(eq(passwordsTable.id, password.id));

  return { success: true };
}

export async function deletePassword(id: number) {
  await db.delete(passwordsTable).where(eq(passwordsTable.id, id));

  return { success: true };
}
