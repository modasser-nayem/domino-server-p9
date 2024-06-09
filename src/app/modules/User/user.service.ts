import {
  TUpdateMyProfile,
  TUpdateUserRole,
  TUpdateUserStatus,
} from "./user.interface";
import { Profile, User } from "./user.model";
import AppError from "../../error/AppError";
import { ExtendedJwtPayload } from "../../interface";

const getMyProfile = async (payload: { user: ExtendedJwtPayload }) => {
  const profile = await Profile.findOne(
    { user: payload.user.id },
    { __v: 0 },
  ).populate({
    path: "user",
    select: "email lastPassChangeAt lastLogin",
  });

  if (!profile) {
    throw new AppError(400, "Profile not found");
  }

  return profile;
};

const updateMyProfile = async (payload: {
  user: ExtendedJwtPayload;
  data: TUpdateMyProfile;
}) => {
  const result = await Profile.findOneAndUpdate(
    { user: payload.user.id },
    payload.data,
    { new: true },
  );

  return result;
};

const getAllUsers = async () => {
  const users = await Profile.find(
    {},
    { name: 1, designation: 1, profileImg: 1, contactNo: 1 },
  ).populate({
    path: "user",
    select: "email status role",
  });
  return users;
};

const getAllInstructorForPublic = async () => {
  const users = await Profile.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "user",
        foreignField: "_id",
        as: "user",
        pipeline: [{ $project: { _id: 1, role: 1 } }],
      },
    },
    { $unwind: "$user" },
    { $match: { "user.role": "admin" } },
    {
      $project: {
        _id: 0,
        user: 1,
        name: 1,
        designation: 1,
        profileImg: 1,
        contactNo: 1,
        socialLinks: 1,
      },
    },
  ]);

  return users;
};

const getSingleUserProfile = async (payload: { userId: string }) => {
  const user = await User.findOne({
    _id: payload.userId,
    isDeleted: false,
    status: "unblock",
  });

  if (!user) {
    throw new AppError(404, "User not found");
  }

  const result = await Profile.findOne({ user: user.id }, { __v: 0 });

  return result;
};

const updateUserStatus = async (payload: {
  admin: ExtendedJwtPayload;
  data: TUpdateUserStatus;
}) => {
  const user = await User.findById(payload.data.userId);

  if (!user) {
    throw new AppError(404, "User not found");
  }

  if (user.id === payload.admin.id) {
    throw new AppError(403, "You can't update own status");
  }

  await User.updateOne({ _id: user.id }, { status: payload.data.status });

  return null;
};

const updateUserRole = async (payload: {
  admin: ExtendedJwtPayload;
  data: TUpdateUserRole;
}) => {
  const user = await User.findById(payload.data.userId);

  if (!user) {
    throw new AppError(404, "User not found");
  }

  if (user.id === payload.admin.id) {
    throw new AppError(403, "You can't update own role");
  }

  await User.updateOne({ _id: user.id }, { role: payload.data.role });

  return null;
};

const userServices = {
  getMyProfile,
  updateMyProfile,
  getAllUsers,
  getAllInstructorForPublic,
  getSingleUserProfile,
  updateUserStatus,
  updateUserRole,
};
export default userServices;
