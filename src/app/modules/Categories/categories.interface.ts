import { z } from "zod";
import categoriesSchemaValidation from "./categories.validation";
import { Types } from "mongoose";

export type TCategory = {
  name: string;
  image: string;
};

export type TSubcategory = {
  category: Types.ObjectId;
  name: string;
  image: string;
};

export type TAddCategory = z.infer<
  typeof categoriesSchemaValidation.addCategory
>;

export type TUpdateCategory = z.infer<
  typeof categoriesSchemaValidation.updateCategory
>;

export type TAddSubcategory = z.infer<
  typeof categoriesSchemaValidation.addSubcategory
>;

export type TUpdateSubcategory = z.infer<
  typeof categoriesSchemaValidation.updateSubcategory
>;
