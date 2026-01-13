// src/server/router.ts
import { router } from "./trpc";
import { passwordRouter } from "./routers/password";

export const appRouter = router({
  password: passwordRouter,
});

export type AppRouter = typeof appRouter;
