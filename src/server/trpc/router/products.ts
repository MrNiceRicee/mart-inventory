import { productSchema } from "../../../schemas/product.schema";
import { publicProcedure, router } from "../trpc";
import { z } from "zod";

export const productRouter = router({
  getAll: publicProcedure.query(async ({ ctx }) =>
    ctx.prisma.product.findMany({
      include: {
        category: true,
        supplier: true,
      },
    })
  ),

  getProduct: publicProcedure.input(z.string()).query(async ({ input, ctx }) =>
    ctx.prisma.product.findFirstOrThrow({
      where: {
        id: input,
      },
      include: {
        category: true,
        supplier: true,
      },
    })
  ),

  createProduct: publicProcedure
    .input(productSchema)
    .mutation(async ({ input, ctx }) =>
      ctx.prisma.product.create({
        data: {
          ...input,
          user: {
            connect: {
              id: ctx.session?.user?.id,
            },
          },
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
        },
      })
    ),

  updateProduct: publicProcedure
    .input(productSchema)
    .mutation(({ input, ctx }) =>
      ctx.prisma.product.update({
        where: {
          id: input.id,
        },
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
        },
      })
    ),
});
