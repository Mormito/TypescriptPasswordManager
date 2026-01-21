import { z } from 'zod';

import { privateProcedure, publicProcedure, router } from '../trpc';
import { userInsertSchema, userUpdateSchema } from '@/packages/schema/user';
import { deleteUser, findAll, findByID, insertUser, updateUser } from '@/packages/domain/user/repository';

export const userRouter = router({
    userFindAll: publicProcedure.query(async () => {
    return await findAll}),

    userFindByID: publicProcedure
    .input(z.string())
    .query(async ({input}) => {return await findByID(input)}), 

    userInsert: publicProcedure
    .input(userInsertSchema)
    .mutation(async ({input}) => {await insertUser(input)}),

    userUpdate: privateProcedure
    .input(userUpdateSchema)
    .mutation(async ({input, ctx}) => {await updateUser(ctx.userId, input)}),

    userDelete: privateProcedure
    .input(z.string())
    .mutation(async ({ctx}) => {return await deleteUser(ctx.userId)})
});
