import { z } from "zod";
import authSchemaValidation from "./auth.validation";
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
