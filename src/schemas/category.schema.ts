import { z } from "zod";

export const categorySchema = z.object({
  id: z.string().optional(),
  name: z.string({
    required_error: "Това поле е задължително",
  }),
});

export const INIT_CATEGORY = {
  name: "",
};
