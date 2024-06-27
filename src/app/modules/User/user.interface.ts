import { Model, Types } from "mongoose";
import { TBloodGroup } from "../../interface/global.types";
import { UserRole, UserStatus } from "../../constant/user.constant";
import { z } from "zod";
import userSchemaValidation from "./user.validation";

/* eslint-disable no-unused-vars */
export type TUserRole = keyof typeof UserRole;
export type TUserStatus = keyof typeof UserStatus;

export type TUser = {
  name: string;
  profileImg: string;
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
  designation: string;
  about: string;
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

export type TUpdateMyProfile = z.infer<
  typeof userSchemaValidation.updateMyProfile
>;

export type TUpdateUserStatus = z.infer<
  typeof userSchemaValidation.updateUserStatus
>;

export type TUpdateUserRole = z.infer<
  typeof userSchemaValidation.updateUserRole
>;

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
