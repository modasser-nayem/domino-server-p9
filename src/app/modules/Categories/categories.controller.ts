import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import categoriesServices from "./categories.service";

const addCategory = catchAsync(async (req, res) => {
  const result = await categoriesServices.addCategory({ data: req.body });

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Successfully Category Added",
    data: result,
  });
});

const getAllCategory = catchAsync(async (req, res) => {
  const result = await categoriesServices.getAllCategory();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Successfully retrieved all categories",
    data: result,
  });
});

const updateCategory = catchAsync(async (req, res) => {
  const result = await categoriesServices.updateCategory({
    categoryId: req.params.id,
    data: req.body,
  });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Category Successfully Updated",
    data: result,
  });
});

const deleteCategory = catchAsync(async (req, res) => {
  const result = await categoriesServices.deleteCategory({
    categoryId: req.params.id,
  });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Category Successfully Deleted",
    data: result,
  });
});

const categoriesControllers = {
  addCategory,
  getAllCategory,
  updateCategory,
  deleteCategory,
};
export default categoriesControllers;
