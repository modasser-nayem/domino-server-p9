import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import authServices from "./auth.service";

const registerUser = catchAsync(async (req, res) => {
  const result = await authServices.registerUser({ data: req.body });

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Successfully SignUp on Domino",
    data: result,
  });
});

const loginUser = catchAsync(async (req, res) => {
  const result = await authServices.loginUser({ data: req.body });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Successfully Login",
    data: result,
  });
});

const changePassword = catchAsync(async (req, res) => {
  const result = await authServices.changePassword({
    data: req.body,
    user: req.user,
  });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Successfully Change Password",
    data: result,
  });
});

const forgotPassword = catchAsync(async (req, res) => {
  const result = await authServices.forgotPassword({ data: req.body });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Check your email to reset password",
    data: result,
  });
});

const resetPassword = catchAsync(async (req, res) => {
  const result = await authServices.resetPassword({ data: req.body });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Password Successfully Reset",
    data: result,
  });
});

const deleteAccount = catchAsync(async (req, res) => {
  const result = await authServices.deleteAccount({ user: req.user });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Account Successfully Deleted",
    data: result,
  });
});

const authControllers = {
  registerUser,
  loginUser,
  changePassword,
  forgotPassword,
  resetPassword,
  deleteAccount,
};
export default authControllers;
