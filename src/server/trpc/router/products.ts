import { productSchema } from "../../../schemas/product.schema";
import { publicProcedure, router } from "../trpc";

export const productRouter = router({
  getAll: publicProcedure.query(async ({ ctx }) =>
    ctx.prisma.product.findMany()
  ),

  createProduct: publicProcedure
    .input(productSchema)
    .mutation(async ({ input, ctx }) =>
      ctx.prisma.product.create({
        data: {
          ...input,
          category: {
            connectOrCreate: {
              create: {
                name: input.category.name,
              },
              where: {
                name: input.category.name,
              },
            },
          },
          supplier: {
            connectOrCreate: {
              create: {
                name: input.supplier.name,
              },
              where: {
                name: input.supplier.name,
              },
            },
          },
        },
      })
    ),
});
