import { router } from "../trpc";
import { authRouter } from "./auth";
import { categoryRouter } from "./categories";
import { productRouter } from "./products";
import { supplierRouter } from "./suppliers";

export const appRouter = router({
  auth: authRouter,
  category: categoryRouter,
  product: productRouter,
  supplier: supplierRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
