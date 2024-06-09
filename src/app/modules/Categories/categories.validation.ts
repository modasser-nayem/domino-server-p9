import { z } from "zod";

const addCategory = z.object({
  name: z
    .string({ required_error: "name is required" })
    .refine((value) => value !== "", { message: "name is required" }),
  image: z.string().url().optional(),
});

const updateCategory = z.object({
  name: z
    .string()
    .optional()
    .refine((value) => value !== "", { message: "name is required" }),
  image: z.string().url().optional(),
});

const categoriesSchemaValidation = { addCategory, updateCategory };
export default categoriesSchemaValidation;
