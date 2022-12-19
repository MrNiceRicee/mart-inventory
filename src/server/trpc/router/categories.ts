import { publicProcedure, router } from "../trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { categorySchema } from "../../../schemas/category.schema";

import { type Prisma } from "@prisma/client";

export const categoryRouter = router({
  getAll: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ ctx }) => {
      return ctx.prisma.category.findMany();
    }),
  getCategory: publicProcedure
    .input(z.object({ categoryId: z.string() }))
    .query(async ({ input, ctx }) => {
      if (!input) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Please provide a valid category id.",
        });
      }
      const category = await ctx.prisma.category.findFirst({
        where: { id: input.categoryId },
      });

      if (!category) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "No category with that id was found",
        });
      }

      return category;
    }),
  createCategory: publicProcedure
    .input(categorySchema)
    .mutation(async ({ input, ctx }) => {
      let categoryInput: Prisma.CategoryCreateInput = { ...input };

      if (input.parentId) {
        categoryInput = {
          ...input,
          parent: {
            connect: {
              id: input.parentId,
            },
          },
        };
      }

      return await ctx.prisma.category.create({
        data: categoryInput,
      });
    }),

  /* updateCategory: publicProcedure
		.input(categorySchema)
		.mutation(async ({ input, ctx }) => {
			//When updating the category, the process is:
			//1. Find category. If no category is found - throw an error
			//2.
			const category = await ctx.prisma.category.findFirstOrThrow({
				where: { id: input.id },
			});

			if (!category) {
				throw new TRPCError({
					code: "NOT_FOUND",
					message: "No category with that id was found",
				});
			}

			return await ctx.prisma.category.update({
				where: {
					id: input.id,
				},
				data: input,
			});
		}), */
});
