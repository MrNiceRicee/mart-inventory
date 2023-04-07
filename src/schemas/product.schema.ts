import { z } from "zod";
import { categorySchema } from "./category.schema";

const requiredText = "Това поле е задължително";

const supplierSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  active: z.boolean().optional(),
});

export const productSchema = z.object({
  id: z.string().optional(),
  name: z.string({
    required_error: requiredText,
  }),
  category: categorySchema,
  quantity: z.number().nullable(),
  price: z.number().nullable(),
  priceRA: z.number().nullable(),
  priceKK: z.number().nullable(),
  supplier: supplierSchema.optional(),
  orderLink: z.string().nullable().optional(),
});

export type ProductSchemaType = z.infer<typeof productSchema>;

export const INIT_PRODUCT: ProductSchemaType = {
  name: "",
  quantity: 0,
  price: 0,
  priceRA: 0,
  priceKK: 0,
  orderLink: "",
  category: {
    name: "",
  },
  supplier: undefined,
};
