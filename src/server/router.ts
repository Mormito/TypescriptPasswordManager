// src/server/router.ts
import { router } from "./trpc";
import { passwordRouter } from "./routers/password";
import { userRouter } from "./routers/user";
import { loginRouter } from "./routers/auth";

export const appRouter = router({
  password: passwordRouter,
  user: userRouter,
  login: loginRouter,
});

export type AppRouter = typeof appRouter;
