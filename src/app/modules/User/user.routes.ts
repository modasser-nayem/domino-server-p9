import { Router } from "express";
import requestValidate from "../../middlewares/requestValidation";
import auth from "../../middlewares/auth";
import { UserRole } from "../../constant/user.constant";
import userSchemaValidation from "./user.validation";
import userControllers from "./user.controller";

const router = Router();

// get my profile
router.get("/me", auth(), userControllers.getMyProfile);

// update my profile
router.put(
  "/me",
  auth(),
  requestValidate(userSchemaValidation.updateMyProfile),
  userControllers.updateMyProfile,
);

// get all users - admin
router.get("/", auth(UserRole.admin), userControllers.getAllUsers);

// get all instructor for public
router.get("/instructors", userControllers.getAllInstructorForPublic);

// get single user profile - public
router.get("/:id", userControllers.getSingleUserProfile);

// update user status - admin
router.patch(
  "/status",
  auth(UserRole.admin),
  requestValidate(userSchemaValidation.updateUserStatus),
  userControllers.updateUserStatus,
);

// update user role - admin
router.patch(
  "/role",
  auth(UserRole.admin),
  requestValidate(userSchemaValidation.updateUserRole),
  userControllers.updateUserRole,
);

const userRoutes = router;
export default userRoutes;
