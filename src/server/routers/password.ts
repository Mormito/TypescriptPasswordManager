import { z } from 'zod';

import { publicProcedure, router } from '../trpc';
import { passwordInsertSchema, passwordUpdateSchema } from '@/packages/schema/password';
import { deletePassword, findAll, findByID, insertPassword, updatePassword } from '@/packages/domain/password/repository';

export const passwordRouter = router({
    passwordFindAll: publicProcedure.query(async () => {
    return await findAll();}),

    passwordFindByID: publicProcedure
    .input(z.string())
    .query(async ({input}) => {return await findByID(input)}), 

    passwordInsert: publicProcedure
    .input(passwordInsertSchema)
    .mutation(async ({input}) => {await insertPassword(input)}),

    passwordUpdate: publicProcedure
    .input(passwordUpdateSchema)
    .mutation(async ({input}) => {await updatePassword(input)}),

    passwordDelete: publicProcedure
    .input(z.string())
    .mutation(async ({input}) => {return await deletePassword(input)})
});
