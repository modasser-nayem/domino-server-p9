import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import userServices from "./user.service";

const getMyProfile = catchAsync(async (req, res) => {
  const result = await userServices.getMyProfile({ user: req.user });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Profile is successfully retrieved",
    data: result,
  });
});

const updateMyProfile = catchAsync(async (req, res) => {
  const result = await userServices.updateMyProfile({
    user: req.user,
    data: req.body,
  });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Successfully saved changed",
    data: result,
  });
});

const getAllUsers = catchAsync(async (req, res) => {
  const result = await userServices.getAllUsers();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Successfully retrieved all users",
    data: result,
  });
});

const getAllInstructorForPublic = catchAsync(async (req, res) => {
  const result = await userServices.getAllInstructorForPublic();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Successfully retrieved all instructors",
    data: result,
  });
});

const getSingleUserProfile = catchAsync(async (req, res) => {
  const result = await userServices.getSingleUserProfile({
    userId: req.params.id,
  });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Successfully retrieved a user profile",
    data: result,
  });
});

const updateUserStatus = catchAsync(async (req, res) => {
  const result = await userServices.updateUserStatus({
    admin: req.user,
    data: req.body,
  });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User Status successfully updated",
    data: result,
  });
});

const updateUserRole = catchAsync(async (req, res) => {
  const result = await userServices.updateUserRole({
    admin: req.user,
    data: req.body,
  });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User Role successfully updated",
    data: result,
  });
});

const userControllers = {
  getMyProfile,
  updateMyProfile,
  getAllUsers,
  getAllInstructorForPublic,
  getSingleUserProfile,
  updateUserStatus,
  updateUserRole,
};
export default userControllers;
