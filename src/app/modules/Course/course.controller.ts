import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import courseServices from "./course.service";

const createCourse = catchAsync(async (req, res) => {
  const result = await courseServices.createCourse({
    user: req.user,
    data: req.body,
  });

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Successfully created new Course",
    data: result,
  });
});

const updateCourse = catchAsync(async (req, res) => {
  const result = await courseServices.updateCourse({
    user: req.user,
    courseId: req.params.id,
    data: req.body,
  });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Course Successfully Updated",
    data: result,
  });
});

const getAllCourses = catchAsync(async (req, res) => {
  const result = await courseServices.getAllCourses();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Successfully retrieved all courses",
    data: result,
  });
});

const getSingleCourse = catchAsync(async (req, res) => {
  const result = await courseServices.getSingleCourse({
    courseId: req.params.id,
  });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Successfully retrieved course",
    data: result,
  });
});

const updateCourseStatus = catchAsync(async (req, res) => {
  const result = await courseServices.updateCourseStatus({
    user: req.user,
    data: req.body,
  });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Status Successfully updated",
    data: result,
  });
});

const deleteCourse = catchAsync(async (req, res) => {
  const result = await courseServices.deleteCourse({
    user: req.user,
    courseId: req.params.id,
  });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Course successfully deleted",
    data: result,
  });
});

const courseControllers = {
  createCourse,
  updateCourse,
  getAllCourses,
  getSingleCourse,
  updateCourseStatus,
  deleteCourse,
};
export default courseControllers;
