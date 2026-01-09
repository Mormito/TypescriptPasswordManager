import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { passwordsTable } from './db/schema';
import { passwordInsertSchema, passwordUpdateSchema } from './schema/password';
import { eq } from 'drizzle-orm';

const db = drizzle(process.env.DATABASE_URL!);

export async function findAll(){
    const passwords = await db.select().from(passwordsTable);
    return passwords;
}

export async function findByID(id: number){
    const password = await db.select().from(passwordsTable).where(eq(passwordsTable.id, id));
    return password;
}

export async function insertPassword(input: object){
    const password = passwordInsertSchema.parse(input);
    await db.insert(passwordsTable).values(password);
}

export async function updatePassword(input: object) {
  const password = passwordUpdateSchema.parse(input);

  return await db.update(passwordsTable).set(password.data).where(eq(passwordsTable.id, password.id));
}

export async function deletePassword(id: number){
    await db.delete(passwordsTable).where(eq(passwordsTable.id, id))
}
