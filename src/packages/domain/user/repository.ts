import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { eq } from "drizzle-orm";

import { usersTable } from "@/packages/db/schema";
import { userInsertSchema, userUpdateSchema } from "@/packages/schema/user"; 
import argon2 from 'argon2';
import { changePasswordSchema } from "@/packages/schema/user";


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

export async function deleteUser(userId: string) {
  await db.delete(usersTable).where(eq(usersTable.id, userId)); //Agora recebe o userId do token

  return { success: true };
}

export async function changePassword(userId: string, input: unknown) {
  const user = changePasswordSchema.parse(input);
  user.password = await argon2.hash(user.password); //criptografia

  await db
    .update(usersTable)
    .set({ passwordHash: user.password })
    .where(eq(usersTable.id, userId)); //Agora recebe o userId do token

  return { success: true };
}