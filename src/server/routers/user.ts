import { z } from 'zod';

import { privateProcedure, publicProcedure, router } from '../trpc';
import { changeDataSchema, userInsertSchema } from '@/packages/schema/user';
import { changeEmail, changePassword, changeUsername, deleteUser, findAll, findByID, insertUser } from '@/packages/domain/user/repository';
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

    changeEmail: privateProcedure
    .input(changeDataSchema)
    .mutation(async ({input, ctx}) => {await changeEmail(ctx.userId, input)}),

    changeUsername: privateProcedure
    .input(changeDataSchema)
    .mutation(async ({input, ctx}) => {await changeUsername(ctx.userId, input)}),

    changePassword: privateProcedure
    .input(changePasswordSchema)
    .mutation(async ({input, ctx}) => {await changePassword(ctx.userId, input)}),
});
