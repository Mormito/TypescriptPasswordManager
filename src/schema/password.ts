import * as z from "zod";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { passwordsTable } from "@/db/schema";

export const passwordInsertSchema = createInsertSchema(passwordsTable, {
    site: z
    .string()
    .min(1, "Registre um site")
    .max(300, "Limite de 300 caracteres atingido"),

    user: z
    .string()
    .min(1, "Registre um nome de usuário")
    .max(200, "Limite de 200 caracteres atingido"),

    password: z
    .string()
    .min(6, "A senha precisa ter ao menos 6 caracteres")
    .max(500, "Limite de 500 caracteres atingido"),
})

export const passwordUpdateSchema = z.object({
    data: passwordInsertSchema.partial(),
    id: z.number()
})

export const passwordSelectSchema = createSelectSchema(passwordsTable);

export type PasswordInsert = z.infer<typeof passwordInsertSchema>;
export type PasswordSelect = z.infer<typeof passwordSelectSchema>;

export type passwordUpdate = z.infer<typeof passwordUpdateSchema>; 