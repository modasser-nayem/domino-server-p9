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

// =========== Sub Category ===========

// add subcategory
router.post(
  "/subcategory",
  auth(UserRole.admin),
  requestValidate(categoriesSchemaValidation.addSubcategory),
  categoriesControllers.addSubcategory,
);

// get all subcategory
router.get("/subcategory", categoriesControllers.getAllSubcategory);

// update subcategory
router.put(
  "/subcategory/:id",
  auth(UserRole.admin),
  requestValidate(categoriesSchemaValidation.updateSubcategory),
  categoriesControllers.updateSubcategory,
);

// delete subcategory
router.delete(
  "/subcategory/:id",
  auth(UserRole.admin),
  categoriesControllers.deleteSubcategory,
);

const categoriesRoutes = router;
export default categoriesRoutes;
