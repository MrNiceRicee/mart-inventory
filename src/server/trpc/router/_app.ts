import { router } from "../trpc";
import { authRouter } from "./auth";
import { categoryRouter } from "./categories";
import { productRouter } from "./products";

export const appRouter = router({
  auth: authRouter,
  category: categoryRouter,
  product: productRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
