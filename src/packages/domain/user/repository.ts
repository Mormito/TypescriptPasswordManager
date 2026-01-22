import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { and, eq } from "drizzle-orm";

import { usersTable } from "@/packages/db/schema";
import { changeDataSchema, userInsertSchema, userUpdateSchema } from "@/packages/schema/user"; 
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

export async function changeUsername(userId: string, input: unknown) {
  const user = changeDataSchema.parse(input);

  const result = await db
    .update(usersTable)
    .set({ user: user.input })
    .where(and(
      eq(usersTable.id, userId),
      eq(usersTable.user, user.old_data_input),
    ))
    .returning({ id: usersTable.id });

  if (result.length === 0) {
    throw new Error("Nome de usuário atual incorreto");
  }

  return { success: true };
}

export async function changeEmail(userId: string, input: unknown) {
  const user = changeDataSchema.parse(input);

  const result = await db
    .update(usersTable)
    .set({ email: user.input })
    .where(and(
      eq(usersTable.id, userId),
      eq(usersTable.email, user.old_data_input), //aqui eu defino que o email antigo deve ser inserido no campo, caso não seja = erro
    ))
    .returning({ id: usersTable.id });

    if (result.length === 0){
      throw new Error("Email atual incorreto")
    }

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