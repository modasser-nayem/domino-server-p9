/* eslint-disable no-unused-vars */
import { z } from "zod";
import authSchemaValidation from "./auth.validation";
import { Model, Types } from "mongoose";
import { TBloodGroup } from "../../interface/global.types";
import { UserRole } from "../../constant/user.constant";
const {
  registerUser,
  loginUser,
  changePassword,
  forgetPassword,
  resetPassword,
} = authSchemaValidation;

export type TRegisterUser = z.infer<typeof registerUser>;

export type TLoginUser = z.infer<typeof loginUser>;
export type TChangePassword = z.infer<typeof changePassword>;

export type TForgotPassword = z.infer<typeof forgetPassword>;

export type TResetPassword = z.infer<typeof resetPassword>;

export type TUserRole = keyof typeof UserRole;
export type TUserStatus = "block" | "unblock";

export type TUser = {
  email: string;
  password: string;
  lastPassChangeAt: Date;
  needPassChange: boolean;
  role: TUserRole;
  status: TUserStatus;
  lastLogin: Date;
  isDeleted: boolean;
};

export type TProfile = {
  user: Types.ObjectId;
  name: string;
  designation: string;
  about: string;
  profileImg: string;
  gender: "male" | "female";
  dateOfBirth: Date;
  bloodGroup: TBloodGroup;
  contactNo: string;
  language: Record<string, string>;
  address: {
    country: string;
    district: string;
    state: string;
  };
  skills: string[];
  education: {
    institute: string;
    subject: string;
    startYear: Date;
    passingYear: Date;
    isComplete: boolean;
  };
  socialLinks: {
    facebook: string;
    twitter: string;
    linkedIn: string;
    youtube: string;
    website: string;
  };
};

export interface IUserModel extends Model<TUser> {
  isPasswordIsMatched(
    plainTextPassword: string,
    hashPassword: string,
  ): Promise<boolean>;
  isJWTIssuedBeforePasswordChanged(
    passwordChangedTimestamp: Date,
    jwtIssuedTimestamp: number,
  ): boolean;
}
