import { Schema, model } from "mongoose";
import { TCategory } from "./categories.interface";

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
