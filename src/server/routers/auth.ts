import { z } from 'zod';

import { publicProcedure, router } from '../trpc';
import { loginSchema } from '@/packages/schema/login';
import { db } from '@/db';
import { usersTable } from '@/packages/db/schema';
import { eq } from 'drizzle-orm';
import argon2 from 'argon2';
import { TRPCError } from '@trpc/server';
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";



export const loginRouter = router({
    login: publicProcedure
    .input(loginSchema)
    .mutation(async ({input}) => {
        const users = await db.select().from(usersTable).where(eq(usersTable.email, input.email));
        const user = users[0];
    
    if (!user) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'Email ou senha incorretos', 
        });
    } 

    if(await argon2.verify(user.passwordHash, input.password) == false){
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'Email ou senha incorretos', 
        });
    }

    // se email e senha batem -> gera jwt e armazena os cookies
    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );

    const cookieStore = await cookies();

    cookieStore.set("session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });

    return { success: true };

    })
});
