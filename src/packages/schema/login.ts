import * as z from "zod";
 
const Login = z.object({
    email: z
    .string()
    .min(10, "Minimo de 10 caracteres")
    .max(254, "Máximo de 254 caracteres"),

    password: z.string(),
});