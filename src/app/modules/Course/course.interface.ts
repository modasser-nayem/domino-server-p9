import { z } from "zod";
import courseSchemaValidation from "./course.validation";
import { Schema } from "mongoose";
import {
  COURSE_LEVEL,
  COURSE_PRICE_TYPE,
  COURSE_STATUS,
} from "./course.constant";

export type TCourseLevel = keyof typeof COURSE_LEVEL;
export type TCourseStatus = keyof typeof COURSE_STATUS;
export type TCoursePriceType = keyof typeof COURSE_PRICE_TYPE;

export type TCourse = {
  instructor: Schema.Types.ObjectId;
  title: string;
  thumbnail_url: string;
  subcategory: Schema.Types.ObjectId;
  level: TCourseLevel;
  price: number;
  priceType: TCoursePriceType;
  description: string;
  features: string[];
  language: string;
  tags: string[];
  status: TCourseStatus;
};

export type TCreateCourse = z.infer<typeof courseSchemaValidation.createCourse>;

export type TUpdateCourse = z.infer<typeof courseSchemaValidation.updateCourse>;

export type TUpdateCourseStatus = z.infer<
  typeof courseSchemaValidation.updateCourseStatus
>;
