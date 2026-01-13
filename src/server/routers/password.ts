import { z } from 'zod';
import { deletePassword, findAll, findByID, insertPassword, updatePassword } from '@/index';
import { publicProcedure, router } from '../trpc';
import { passwordInsertSchema, passwordUpdateSchema } from '@/schema/password';

export const passwordRouter = router({
    passwordFindAll: publicProcedure.query(async () => {
    return await findAll();}),

    passwordFindByID: publicProcedure
    .input(z.number())
    .query(async ({input}) => {return await findByID(input)}), 

    passwordInsert: publicProcedure
    .input(passwordInsertSchema)
    .mutation(async ({input}) => {await insertPassword(input)}),

    passwordUpdate: publicProcedure
    .input(passwordUpdateSchema)
    .mutation(async ({input}) => {await updatePassword(input)}),

    passwordDelete: publicProcedure
    .input(z.number())
    .mutation(async ({input}) => {return await deletePassword(input)})
});
