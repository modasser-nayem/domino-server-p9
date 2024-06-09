import { Schema, model } from "mongoose";
import { TCategory, TSubcategory } from "./categories.interface";

const categorySchema = new Schema<TCategory>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      type: String,
    },
  },
  { id: true, timestamps: true },
);

export const Category = model<TCategory>("Category", categorySchema);

// Subcategory
const subcategorySchema = new Schema<TSubcategory>(
  {
    category: {
      type: Schema.ObjectId,
      ref: "Category",
    },
    name: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      type: String,
    },
  },
  { id: true, timestamps: true },
);

export const Subcategory = model<TSubcategory>(
  "Subcategory",
  subcategorySchema,
);
