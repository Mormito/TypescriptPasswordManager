// src/server/router.ts
import { router } from "./trpc";
import { passwordRouter } from "./routers/password";
import { userRouter } from "./routers/user";

export const appRouter = router({
  password: passwordRouter,
  user: userRouter,
});

export type AppRouter = typeof appRouter;
