import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { and, eq } from "drizzle-orm";

import { passwordsTable } from "@/packages/db/schema";
import { passwordInsertSchema, passwordUpdateSchema } from "@/packages/schema/password";

const sql = neon(process.env.DATABASE_URL!);

export const db = drizzle(sql);

export async function findAll(userId: string) {
  console.log("DRIZZLE - FIND ALL == ", userId);
  return db
    .select()
    .from(passwordsTable)
    .where(eq(passwordsTable.userId, userId));
}

export async function findByID(userId: string, id: string) {
  return db
    .select()
    .from(passwordsTable)
    .where(and(
      eq(passwordsTable.id, id),
      eq(passwordsTable.userId, userId)));
}

export async function insertPassword(userId: string, input: unknown) { // aqui ta recebendo normalmente o input + userId
  console.log("DRIZZLE - INSERT == ", userId);
  const password = passwordInsertSchema.parse(input);
  console.log("DRIZZLE - DATA == ", input);

  await db.insert(passwordsTable).values({
    ...password,
    userId,
  });

  return { success: true };
}

export async function updatePassword(userId: string, input: unknown) {
  const password = passwordUpdateSchema.parse(input);

  await db
    .update(passwordsTable)
    .set(password.data)
    .where(and(
      eq(passwordsTable.id, password.id),
      eq(passwordsTable.userId, userId)));
      
  return { success: true };
}

export async function deletePassword(userId: string, id: string) {
  await db
  .delete(passwordsTable)
  .where(and(
    eq(passwordsTable.id, id),
    eq(passwordsTable.userId, userId)));

  return { success: true };
}
