import { z } from 'zod';

import { privateProcedure, router } from '../trpc';
import { passwordInsertSchema, passwordUpdateSchema } from '@/packages/schema/password';
import { deletePassword, findAll, findByID, insertPassword, updatePassword } from '@/packages/domain/password/repository';

export const passwordRouter = router({
    passwordFindAll: privateProcedure.query(async ({ ctx }) => {console.log("CTX", ctx.userId); return await findAll(ctx.userId);}),

    passwordFindByID: privateProcedure
    .input(z.string())
    .query(async ({input, ctx}) => {return await findByID(ctx.userId, input)}), 

    passwordInsert: privateProcedure
    .input(passwordInsertSchema)
    .mutation(async ({input, ctx}) => {await insertPassword(ctx.userId, input)}), // aqui eu to passando o input + ctx

    passwordUpdate: privateProcedure
    .input(passwordUpdateSchema)
    .mutation(async ({input, ctx}) => {await updatePassword(ctx.userId, input)}),

    passwordDelete: privateProcedure
    .input(z.string())
    .mutation(async ({input, ctx}) => {return await deletePassword(ctx.userId, input)})
});
