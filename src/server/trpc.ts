import { initTRPC } from "@trpc/server";
import superjson from "superjson";
import { createContext } from "./context";
import { TRPCError } from "@trpc/server";

export const t = initTRPC
  .context<typeof createContext>()
  .create({
    transformer: superjson,
  });

export const router = t.router;
export const publicProcedure = t.procedure;

export const privateProcedure = t.procedure.use(({ ctx, next }) => {
  if (!ctx.userId) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
    });
  }

  return next({
    ctx: {
      userId: ctx.userId,
    },
  });
});