import * as z from "zod";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { usersTable } from "@/packages/db/schema";

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

export type UserInsert = z.infer<typeof userInsertSchema>;
export type UserSelect = z.infer<typeof userSelectSchema>;

export type UserUpdate = z.infer<typeof userUpdateSchema>; 

// Zod password
export const changePasswordSchema = z
  .object({
    password: z.string(),
    password2: z.string(),
  })
  .refine((data) => data.password === data.password2, {
    message: "As senhas não coincidem",
    path: ["password2"], 
  });

export type ChangePassword = z.infer<typeof changePasswordSchema>;

// Zod user or email
export const changeDataSchema = z
  .object({
    old_data_input: z
    .string()
    .min(3, "Minimo de 3 caracteres")
    .max(254, "Máximo de 254 caracteres"),

    input: z.string(),
    input2: z.string(),
  })
  .refine((data) => data.input === data.input2, {
    message: "Os campos não coincidem",
    path: ["input2"], 
  });

export type ChangeData = z.infer<typeof changeDataSchema>;