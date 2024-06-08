import { JwtPayload } from "jsonwebtoken";
import {
  TChangePassword,
  TForgotPassword,
  TLoginUser,
  TRegisterUser,
  TResetPassword,
} from "./auth.interface";
import mongoose from "mongoose";
import { Profile, User } from "./auth.model";
import config from "../../config";
import AppError from "../../error/AppError";
import { createToken, makeHashPassword, verifyToken } from "./auth.utils";
import { sendEmail } from "../../utils/sendEmail";

const registerUser = async (payload: { data: TRegisterUser }) => {
  const userData = {
    email: payload.data.email,
    password: payload.data.password,
  };

  const profileData = {
    name: payload.data.name,
    contactNo: payload.data.contactNo,
  };

  const isEmailExist = await User.findOne({ email: payload.data.email });

  if (isEmailExist) {
    throw new AppError(400, "This email already exist!");
  }

  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const user = await User.create([userData], { session });

    await Profile.create([{ ...profileData, user: user[0].id }], {
      session,
    });

    await session.commitTransaction();
    await session.endSession();

    return null;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    // eslint-disable-next-line no-console
    console.log(error);
    throw new AppError(400, error.message);
  }
};

const loginUser = async (payload: { data: TLoginUser }) => {
  const user = await User.findOne({ email: payload.data.email }).select(
    "+password",
  );

  if (!user) {
    throw new AppError(404, "User not exist!");
  }

  if (user.status === "block") {
    throw new AppError(403, "Your account is block");
  }

  if (user.isDeleted === true) {
    throw new AppError(400, "Your account is deleted");
  }

  if (!(await User.isPasswordIsMatched(payload.data.password, user.password))) {
    throw new AppError(400, "incorrect password");
  }

  const loginDateUpdate = await User.findByIdAndUpdate(user.id, {
    lastLogin: new Date(Date.now()),
  });

  if (!loginDateUpdate) {
    throw new AppError(500, "Something wrong try again");
  }

  const access_token = createToken(
    { id: user.id, role: user.role },
    config.jwt_access_secret,
    config.jwt_access_expires_in,
  );

  return { access_token };
};

const changePassword = async (payload: {
  data: TChangePassword;
  user: JwtPayload;
}) => {
  const user = await User.findById(payload.user.id).select("+password");

  if (!user) {
    throw new AppError(404, "User not exist!");
  }

  if (
    !(await User.isPasswordIsMatched(
      payload.data.currentPassword,
      user.password,
    ))
  ) {
    throw new AppError(400, "incorrect password");
  }

  payload.data.newPassword = await makeHashPassword(payload.data.newPassword);

  await User.findByIdAndUpdate(user.id, {
    password: payload.data.newPassword,
    lastPassChangeAt: new Date(Date.now()),
    needPassChange: false,
  });

  return null;
};

const forgotPassword = async (payload: { data: TForgotPassword }) => {
  const user = await User.findOne({ email: payload.data.email });

  if (!user) {
    throw new AppError(404, "User not exist!");
  }

  if (user.status === "block") {
    throw new AppError(403, "Your account is blocked");
  }

  if (user.isDeleted === true) {
    throw new AppError(400, "Your account is deleted");
  }

  const forgotPassToken = createToken(
    { id: user.id, role: user.role },
    config.jwt_access_secret,
    config.jwt_forgot_pass_expires_in,
  );

  const generateURL = `${config.client_url}?token=${forgotPassToken}`;

  const htmlDoc = generateURL;

  await sendEmail(payload.data.email, htmlDoc);

  return null;
};

const resetPassword = async (payload: {
  data: TResetPassword;
  token?: string;
}) => {
  if (!payload.token) {
    throw new AppError(403, "You have not permission to access this route");
  }

  const decodeUser = verifyToken(payload.token, config.jwt_access_secret);

  const user = await User.findById(decodeUser.id);

  if (!user) {
    throw new AppError(404, "User not exist!");
  }

  if (user.status === "block") {
    throw new AppError(403, "Your account is block");
  }

  if (user.isDeleted === true) {
    throw new AppError(400, "Your account is deleted");
  }

  payload.data.newPassword = await makeHashPassword(payload.data.newPassword);

  await User.findByIdAndUpdate(user.id, {
    password: payload.data.newPassword,
    lastPassChangeAt: new Date(Date.now()),
  });

  return null;
};

const deleteAccount = async (payload: { user: JwtPayload }) => {
  const user = await User.findById(payload.user.id);

  if (!user) {
    throw new AppError(404, "Account not found");
  }

  await User.findByIdAndUpdate(user.id, { isDeleted: true });

  return payload;
};

const authServices = {
  registerUser,
  loginUser,
  changePassword,
  forgotPassword,
  resetPassword,
  deleteAccount,
};
export default authServices;
