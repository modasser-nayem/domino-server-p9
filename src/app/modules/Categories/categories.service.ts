import AppError from "../../error/AppError";
import {
  TAddCategory,
  TAddSubcategory,
  TUpdateCategory,
  TUpdateSubcategory,
} from "./categories.interface";
import { Category, Subcategory } from "./categories.model";

const addCategory = async (payload: { data: TAddCategory }) => {
  if (
    await Category.findOne({
      name: { $regex: new RegExp(`^${payload.data.name}$`, "i") },
    })
  ) {
    throw new AppError(400, "Category name is already exist!");
  }

  const result = await Category.create(payload.data);

  return result;
};

const getAllCategory = async () => {
  const result = await Category.find({}, { __v: 0, updatedAt: 0 });

  return result;
};

const updateCategory = async (payload: {
  categoryId: string;
  data: TUpdateCategory;
}) => {
  if (!Object.keys(payload.data).length) {
    return null;
  }

  const category = await Category.findById(payload.categoryId);

  if (!category) {
    throw new AppError(404, "Category not found");
  }

  const nameExist = await Category.findOne({
    _id: { $ne: category.id },
    name: { $regex: new RegExp(`^${payload.data.name}$`, "i") },
  });

  if (nameExist) {
    throw new AppError(400, "Category name is already exist!");
  }

  const result = await Category.findByIdAndUpdate(
    payload.categoryId,
    payload.data,
    { new: true, projection: { __v: 0 } },
  );

  return result;
};

const deleteCategory = async (payload: { categoryId: string }) => {
  const result = await Category.findByIdAndDelete({ _id: payload.categoryId });

  if (!result) {
    throw new AppError(404, "Category not found");
  }

  return null;
};

// ======== Sub Category ========

const addSubcategory = async (payload: { data: TAddSubcategory }) => {
  const category = await Category.findById(payload.data.category);

  if (!category) {
    throw new AppError(404, "Category not found");
  }

  if (
    await Subcategory.findOne({
      name: { $regex: new RegExp(`^${payload.data.name}$`, "i") },
    })
  ) {
    throw new AppError(400, "Subcategory name is already exist!");
  }

  const result = await Subcategory.create(payload.data);

  return result;
};

const getAllSubcategory = async () => {
  const result = await Subcategory.find({}, { __v: 0, updatedAt: 0 }).populate({
    path: "category",
    select: "name image",
  });

  return result;
};

const updateSubcategory = async (payload: {
  categoryId: string;
  data: TUpdateSubcategory;
}) => {
  if (!Object.keys(payload.data).length) {
    return null;
  }

  const subcategory = await Subcategory.findById(payload.categoryId);

  if (!subcategory) {
    throw new AppError(404, "Subcategory not found");
  }

  const category = await Category.findById(payload.data.category);

  if (!category) {
    throw new AppError(404, "Category not found");
  }

  const nameExist = await Subcategory.findOne({
    _id: { $ne: subcategory.id },
    name: { $regex: new RegExp(`^${payload.data.name}$`, "i") },
  });

  if (nameExist) {
    throw new AppError(400, "subcategory name is already exist!");
  }

  const result = await Subcategory.findByIdAndUpdate(
    payload.categoryId,
    payload.data,
    { new: true, projection: { __v: 0 } },
  );

  return result;
};

const deleteSubcategory = async (payload: { categoryId: string }) => {
  const result = await Subcategory.findByIdAndDelete({
    _id: payload.categoryId,
  });

  if (!result) {
    throw new AppError(404, "Subcategory not found");
  }

  return null;
};

const categoriesServices = {
  addCategory,
  getAllCategory,
  updateCategory,
  deleteCategory,
  addSubcategory,
  getAllSubcategory,
  updateSubcategory,
  deleteSubcategory,
};
export default categoriesServices;
