import { z } from 'zod';

import { privateProcedure, publicProcedure, router } from '../trpc';
import { userInsertSchema } from '@/packages/schema/user';
import { changePassword, deleteUser, findAll, findByID, insertUser } from '@/packages/domain/user/repository';
import { changePasswordSchema } from '@/packages/schema/user';

export const userRouter = router({
    userFindAll: publicProcedure.query(async () => {
    return await findAll}),

    userFindByID: publicProcedure
    .input(z.string())
    .query(async ({input}) => {return await findByID(input)}), 

    userInsert: publicProcedure
    .input(userInsertSchema)
    .mutation(async ({input}) => {await insertUser(input)}),

    userDelete: privateProcedure
    .input(z.string())
    .mutation(async ({ctx}) => {return await deleteUser(ctx.userId)}),

    changePassword: privateProcedure
    .input(changePasswordSchema)
    .mutation(async ({input, ctx}) => {await changePassword(ctx.userId, input)}),
});
