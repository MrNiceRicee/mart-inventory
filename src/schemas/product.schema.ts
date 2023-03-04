import { z } from "zod";
import { categorySchema } from "./category.schema";

const supplierSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  active: z.boolean().optional(),
});

export const productSchema = z.object({
  name: z.string(),
  category: categorySchema,
  quantity: z.number(),
  price: z.number(),
  priceRA: z.number(),
  priceKK: z.number(),
  supplier: supplierSchema,
  orderLink: z.string().optional(),
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
  supplier: {
    name: "",
  },
};
