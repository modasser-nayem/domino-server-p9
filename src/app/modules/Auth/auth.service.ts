import { JwtPayload } from "jsonwebtoken";
import bcrypt from "bcrypt";
import {
  TChangePassword,
  TForgotPassword,
  TLoginUser,
  TRegisterUser,
  TResetPassword,
} from "./auth.interface";
import mongoose from "mongoose";
import { ProfileModel, UserModel } from "./auth.model";
import config from "../../config";
import AppError from "../../error/AppError";
import { createToken } from "./auth.utils";

const registerUser = async (payload: { data: TRegisterUser }) => {
  const hashPassword = await bcrypt.hash(
    payload.data.password,
    Number(config.bcrypt_salt_rounds),
  );

  const userData = {
    email: payload.data.email,
    password: hashPassword,
  };

  const profileData = {
    name: payload.data.name,
    contactNo: payload.data.contactNo,
  };

  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const user = await UserModel.create([userData], { session });

    await ProfileModel.create([{ ...profileData, user: user[0].id }], {
      session,
    });

    await session.commitTransaction();
    await session.endSession();

    return null;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    console.log(error);
    throw new AppError(400, error.message);
  }
};

const loginUser = async (payload: { data: TLoginUser }) => {
  const user = await UserModel.findOne({ email: payload.data.email });

  if (!user) {
    throw new AppError(404, "User not exist!");
  }

  if (user.status === "block") {
    throw new AppError(403, "Your account is block");
  }

  if (!(await bcrypt.compare(payload.data.password, user.password))) {
    throw new AppError(400, "incorrect password");
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
  return payload;
};

const forgotPassword = async (payload: { data: TForgotPassword }) => {
  return payload;
};

const resetPassword = async (payload: { data: TResetPassword }) => {
  return payload;
};

const deleteAccount = async (payload: { user: JwtPayload }) => {
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
