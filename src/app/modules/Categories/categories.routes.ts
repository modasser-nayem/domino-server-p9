import { Router } from "express";
import auth from "../../middlewares/auth";
import { UserRole } from "../../constant/user.constant";
import requestValidate from "../../middlewares/requestValidation";
import categoriesSchemaValidation from "./categories.validation";
import categoriesControllers from "./categories.controller";

const router = Router();

// add category
router.post(
  "/category",
  auth(UserRole.admin),
  requestValidate(categoriesSchemaValidation.addCategory),
  categoriesControllers.addCategory,
);

// get all category
router.get("/category", categoriesControllers.getAllCategory);

// update category
router.put(
  "/category/:id",
  auth(UserRole.admin),
  requestValidate(categoriesSchemaValidation.updateCategory),
  categoriesControllers.updateCategory,
);

// delete category
router.delete(
  "/category/:id",
  auth(UserRole.admin),
  categoriesControllers.deleteCategory,
);

const categoriesRoutes = router;
export default categoriesRoutes;
