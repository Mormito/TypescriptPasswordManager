import * as z from "zod";

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
