import { Schema, model } from "mongoose";
import { bloodGroupsArray } from "../../constant/global.constant";
import { IUserModel, TProfile, TUser } from "./user.interface";
import { checkPasswordIsCorrect, makeHashPassword } from "../Auth/auth.utils";

// user model
const userSchema = new Schema<TUser, IUserModel>(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: 0,
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
        values: ["blocked", "unblock"],
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

userSchema.pre("save", async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  user.password = await makeHashPassword(user.password);

  next();
});

userSchema.post("save", async function (doc, next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  doc.password = "";
  next();
});

userSchema.statics.isPasswordIsMatched = async function (
  plainTextPassword: string,
  hashedPassword: string,
) {
  return await checkPasswordIsCorrect(plainTextPassword, hashedPassword);
};

userSchema.statics.isJWTIssuedBeforePasswordChanged = function (
  passwordChangedTimestamp: Date,
  jwtIssuedTimestamp: number,
) {
  const passwordChangedTime =
    new Date(passwordChangedTimestamp).getTime() / 1000;
  return passwordChangedTime > jwtIssuedTimestamp;
};

export const User = model<TUser, IUserModel>("User", userSchema);

// profile model
const profileSchema = new Schema<TProfile>(
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
      enum: bloodGroupsArray,
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

export const Profile = model<TProfile>("Profile", profileSchema);
