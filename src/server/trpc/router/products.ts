import { publicProcedure, router } from "../trpc";

export const productRouter = router({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.product.findMany();
  }),
});
