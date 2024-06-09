import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../../config";
import { ExtendedJwtPayload } from "../../interface";

export const makeHashPassword = async (plainTextPassword: string) => {
  return await bcrypt.hash(
    plainTextPassword,
    Number(config.bcrypt_salt_rounds),
  );
};

export const checkPasswordIsCorrect = async (
  plainTextPassword: string,
  hashPassword: string,
) => {
  return await bcrypt.compare(plainTextPassword, hashPassword);
};

export const createToken = (
  jwtPayload: { id: string; role: string },
  secret: string,
  expiresIn: string,
) => {
  return jwt.sign(jwtPayload, secret, {
    expiresIn,
  });
};

export const verifyToken = (token: string, secret: string) => {
  return jwt.verify(token, secret) as ExtendedJwtPayload;
};
