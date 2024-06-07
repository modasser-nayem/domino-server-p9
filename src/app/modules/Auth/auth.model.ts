import { Schema, model } from "mongoose";
import { TProfileModel, TUserModel } from "./auth.interface";
import { bloodGroups } from "../../constant/global.constant";

// user model
const userSchema = new Schema<TUserModel>(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    lastPassChangeAt: {
      type: Date,
    },
    needPassChange: {
      type: Boolean,
      default: true,
    },
    role: {
      type: String,
      enum: {
        values: ["admin", "instructor", "student"],
      },
      default: "student",
    },
    status: {
      type: String,
      enum: {
        values: ["block", "unblock"],
      },
      default: "unblock",
    },
    lastLogin: {
      type: Date,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { id: true, timestamps: true },
);

export const UserModel = model<TUserModel>("User", userSchema);

// profile model
const profileSchema = new Schema<TProfileModel>(
  {
    user: {
      type: Schema.ObjectId,
      ref: "User",
    },
    name: {
      type: String,
    },
    designation: String,
    about: String,
    profileImg: String,
    gender: {
      type: String,
      enum: ["male", "female"],
    },
    dateOfBirth: Date,
    bloodGroup: {
      type: String,
      enum: bloodGroups,
    },
    contactNo: String,
    language: {},
    address: {
      country: String,
      district: String,
      state: String,
    },
    skills: [{ type: String }],
    education: {
      institute: String,
      subject: String,
      startYear: Date,
      passingYear: Date,
      isComplete: Boolean,
    },
    socialLinks: {
      facebook: String,
      twitter: String,
      linkedIn: String,
      youtube: String,
      website: String,
    },
  },
  { id: true, timestamps: true },
);

export const ProfileModel = model<TProfileModel>("Profile", profileSchema);
