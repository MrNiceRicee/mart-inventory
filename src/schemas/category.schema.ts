import { z } from "zod";

export const categorySchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  parentId: z.string().optional(),
});

export type CategoryValues = z.infer<typeof categorySchema>;
