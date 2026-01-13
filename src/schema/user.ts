import * as z from "zod";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { usersTable } from "@/db/schema";

export const userInsertSchema = createInsertSchema(usersTable, {
    user: z
    .string()
    .min(3, "Minimo de 3 caracteres")
    .max(100, "Máximo de 100 caracteres"),

    email: z
    .string()
    .min(10, "Minimo de 10 caracteres")
    .max(254, "Máximo de 254 caracteres"),

    passwordHash: z.string(),
});

export const userUpdateSchema = z.object({
    data: userInsertSchema.partial(),
    id: z.uuid()
});

export const userSelectSchema = createSelectSchema(usersTable);

export type userInsert = z.infer<typeof userInsertSchema>;
export type userSelect = z.infer<typeof userSelectSchema>;

export type userUpdate = z.infer<typeof userUpdateSchema>; 