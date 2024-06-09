import { z } from "zod";
import categoriesSchemaValidation from "./categories.validation";

export type TCategory = {
  name: string;
  image: string;
};

export type TAddCategory = z.infer<
  typeof categoriesSchemaValidation.addCategory
>;

export type TUpdateCategory = z.infer<
  typeof categoriesSchemaValidation.updateCategory
>;
