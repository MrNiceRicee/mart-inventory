import { router } from "../trpc";
import { publicProcedure } from "../trpc";

export const supplierRouter = router({
  getAll: publicProcedure.query(async ({ ctx }) =>
    ctx.prisma.product.findMany()
  ),
});
