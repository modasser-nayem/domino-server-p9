import { Router } from "express";
import authControllers from "./auth.controller";
import requestValidate from "../../middlewares/requestValidation";
import authSchemaValidation from "./auth.validation";
import auth from "../../middlewares/auth";

const router = Router();

// register user
router.post(
  "/register",
  requestValidate(authSchemaValidation.registerUser),
  authControllers.registerUser,
);

// login user
router.post(
  "/login",
  requestValidate(authSchemaValidation.loginUser),
  authControllers.loginUser,
);

// change password
router.put(
  "/change-password",
  auth(),
  requestValidate(authSchemaValidation.changePassword),
  authControllers.changePassword,
);

// forgot password
router.post(
  "/forgot-password",
  requestValidate(authSchemaValidation.forgetPassword),
  authControllers.forgotPassword,
);

// reset password
router.put(
  "/reset-password",
  requestValidate(authSchemaValidation.resetPassword),
  authControllers.resetPassword,
);

// delete account
router.delete("/account", auth(), authControllers.deleteAccount);

const authRoutes = router;
export default authRoutes;
