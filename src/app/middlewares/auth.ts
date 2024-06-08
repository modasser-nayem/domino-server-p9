import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";

import catchAsync from "../utils/catchAsync";
import { TUserRole } from "../modules/Auth/auth.interface";
import AppError from "../error/AppError";
import { User } from "../modules/Auth/auth.model";

const auth = (...roles: TUserRole[]) => {
  return catchAsync(async (req, res, next) => {
    const token = req.headers.authorization;

    // checking if the token is missing
    if (!token) {
      throw new AppError(401, "You are not authorized!");
    }

    // checking if the given token is valid
    const decoded = jwt.verify(
      token,
      config.jwt_access_secret as string,
    ) as JwtPayload;

    const { role, id, iat } = decoded;

    // checking if the user is exist
    const user = await User.findById(id);

    if (!user) {
      throw new AppError(404, "This account is not found!");
    }
    // checking if the user is already deleted

    const isDeleted = user?.isDeleted;

    if (isDeleted) {
      throw new AppError(403, "This user is deleted!");
    }

    // checking if the user is blocked
    const userStatus = user?.status;

    if (userStatus === "block") {
      throw new AppError(403, "This user is blocked");
    }

    if (
      user.lastPassChangeAt &&
      User.isJWTIssuedBeforePasswordChanged(
        user.lastPassChangeAt,
        iat as number,
      )
    ) {
      throw new AppError(401, "You are not authorized !");
    }

    if (roles && roles.length && !roles.includes(role)) {
      throw new AppError(403, "You don't have permission to access this data!");
    }

    req.user = decoded as JwtPayload;
    next();
  });
};

export default auth;
