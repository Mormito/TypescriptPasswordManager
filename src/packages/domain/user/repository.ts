import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { eq } from "drizzle-orm";

import { usersTable } from "@/packages/db/schema";
import { userInsertSchema, userUpdateSchema } from "@/packages/schema/user"; 
import argon2 from 'argon2';


const sql = neon(process.env.DATABASE_URL!);

export const db = drizzle(sql);

export async function findAll() {
  return db.select().from(usersTable);
}

export async function findByID(id: string) {
  return db
    .select()
    .from(usersTable)
    .where(eq(usersTable.id, id));
}

export async function insertUser(input: unknown) {
  const user = userInsertSchema.parse(input);
  user.passwordHash = await argon2.hash(user.passwordHash); //criptografia
  await db.insert(usersTable).values(user);

  return { success: true };
}

export async function updateUser(input: unknown) {
  const user = userUpdateSchema.parse(input);

  await db
    .update(usersTable)
    .set(user.data)
    .where(eq(usersTable.id, user.id));

  return { success: true };
}


export async function deleteUser(id: string) {
  await db.delete(usersTable).where(eq(usersTable.id, id));

  return { success: true };
}
