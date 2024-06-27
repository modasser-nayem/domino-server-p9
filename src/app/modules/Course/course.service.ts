import AppError from "../../error/AppError";
import { ExtendedJwtPayload } from "../../interface";
import { Subcategory } from "../Categories/categories.model";
import {
  TCreateCourse,
  TUpdateCourse,
  TUpdateCourseStatus,
} from "./course.interface";
import { Course } from "./course.model";

const createCourse = async (payload: {
  user: ExtendedJwtPayload;
  data: TCreateCourse;
}) => {
  const subcategory = await Subcategory.findById(payload.data.subcategory);

  if (!subcategory) {
    throw new AppError(404, "Subcategory not found");
  }

  const result = await Course.create({
    ...payload.data,
    instructor: payload.user.id,
  });

  return result;
};

const updateCourse = async (payload: {
  user: ExtendedJwtPayload;
  courseId: string;
  data: TUpdateCourse;
}) => {
  if (Object.keys(payload.data).length === 0) {
    return null;
  }

  const course = await Course.findById(payload.courseId);

  if (!course) {
    throw new AppError(404, "Course not found");
  }

  if (course.instructor.toString() !== payload.user.id) {
    throw new AppError(403, "You don't have permission to update this data");
  }

  const result = await Course.findByIdAndUpdate(course.id, payload.data, {
    new: true,
  });

  return result;
};

const getAllCourses = async () => {
  const result = await Course.find(
    {},
    {
      title: 1,
      thumbnail_url: 1,
      price: 1,
      priceType: 1,
      level: 1,
      language: 1,
      status: 1,
    },
  ).populate({ path: "instructor", select: "_id name" });

  return result;
};

const getSingleCourse = async (payload: { courseId: string }) => {
  const result = await Course.findById(payload.courseId, { __v: 0 }).populate({
    path: "instructor",
    select: "_id name",
  });

  if (!result) {
    throw new AppError(404, "Course not found");
  }

  return result;
};

const updateCourseStatus = async (payload: {
  user: ExtendedJwtPayload;
  data: TUpdateCourseStatus;
}) => {
  const course = await Course.findById(payload.data.courseId);

  if (!course) {
    throw new AppError(404, "Course not found");
  }

  if (course.instructor.toString() !== payload.user.id) {
    throw new AppError(403, "You don't have permission to update this data");
  }

  await Course.updateOne({ _id: course.id }, { status: payload.data.status });

  return null;
};

const deleteCourse = async (payload: {
  user: ExtendedJwtPayload;
  courseId: string;
}) => {
  const course = await Course.findById(payload.courseId);

  if (!course) {
    throw new AppError(404, "Course not found");
  }

  if (course.instructor.toString() !== payload.user.id) {
    throw new AppError(403, "You don't have permission to update this data");
  }

  await Course.deleteOne({ _id: course._id });

  return payload;
};

const courseServices = {
  createCourse,
  updateCourse,
  getAllCourses,
  getSingleCourse,
  updateCourseStatus,
  deleteCourse,
};
export default courseServices;
