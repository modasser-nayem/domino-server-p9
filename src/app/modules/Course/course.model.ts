import { Schema, model } from "mongoose";
import { TCourse } from "./course.interface";
import { COURSE_STATUS } from "./course.constant";

const courseSchema = new Schema<TCourse>({
  instructor: {
    type: Schema.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  thumbnail_url: {
    type: String,
    required: true,
  },
  subcategory: {
    type: Schema.ObjectId,
    ref: "Subcategory",
    required: true,
  },
  level: {
    type: String,
    enum: ["beginner", "intermediate", "advanced"],
  },
  price: {
    type: Number,
    required: true,
  },
  priceType: {
    type: String,
    enum: ["free", "paid"],
    default: "paid",
  },
  description: {
    type: String,
    required: true,
  },
  features: {
    type: Array({
      type: String,
    }),
  },
  language: {
    type: String,
    required: true,
  },
  tags: {
    type: Array({
      type: String,
    }),
  },
  status: {
    type: String,
    enum: ["upcoming", "ongoing", "close"],
    default: COURSE_STATUS.upcoming,
  },
});

export const Course = model<TCourse>("Course", courseSchema);
