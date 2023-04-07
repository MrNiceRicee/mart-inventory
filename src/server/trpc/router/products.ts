import { productSchema } from "../../../schemas/product.schema";
import { protectedProcedure, publicProcedure, router } from "../trpc";
import { z } from "zod";
import { Prisma } from "@prisma/client";

export const productRouter = router({
  getAll: publicProcedure.query(async ({ ctx }) =>
    ctx.prisma.product.findMany({
      select: {
        id: true,
        name: true,
        quantity: true,
        category: {
          select: {
            name: true,
          },
        },
        priceKK: true,
        priceRA: true,
        orderLink: true,
      },
    })
  ),

  getProduct: publicProcedure.input(z.string()).query(async ({ input, ctx }) =>
    ctx.prisma.product.findFirst({
      where: {
        id: input,
        userId: ctx.session?.user?.id,
      },
      select: {
        id: true,
        category: true,
        supplier: true,
        price: true,
        priceRA: true,
        priceKK: true,
        orderLink: true,
        quantity: true,
        name: true,
      },
    })
  ),

  createProduct: protectedProcedure
    .input(productSchema)
    .mutation(async ({ input, ctx }) => {
      let createProduct:
        | Prisma.ProductCreateInput
        | Prisma.ProductCreateWithoutSupplierInput;

      if (input.supplier) {
        createProduct = {
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
                name: input.supplier?.name,
              },
              where: {
                name: input.supplier?.name,
              },
            },
          },
        } as Prisma.ProductCreateInput;
      } else {
        createProduct = {
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
        } as Prisma.ProductCreateWithoutSupplierInput;
      }

      return await ctx.prisma.product.create({
        data: {
          ...createProduct,
          user: {
            connect: {
              id: ctx.session.user.id,
            },
          },
        },
      });
    }),

  updateProduct: protectedProcedure
    .input(productSchema)
    .mutation(async ({ input, ctx }) => {
      let updatedProduct;

      if (input.supplier) {
        updatedProduct = {
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
        } as Prisma.ProductUpdateInput;
      } else {
        updatedProduct = {
          ...input,
          user: undefined,
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
        } as Prisma.ProductUpdateWithoutSupplierInput;
      }

      return await ctx.prisma.product.update({
        where: {
          id: input.id,
        },
        data: updatedProduct,
      });
    }),
});
