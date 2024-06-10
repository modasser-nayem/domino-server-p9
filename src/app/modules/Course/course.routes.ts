import { Router } from "express";
import auth from "../../middlewares/auth";
import { UserRole } from "../../constant/user.constant";
import requestValidate from "../../middlewares/requestValidation";
import courseSchemaValidation from "./course.validation";
import courseControllers from "./course.controller";

const router = Router();

// create course
router.post(
  "/",
  auth(UserRole.instructor),
  requestValidate(courseSchemaValidation.createCourse),
  courseControllers.createCourse,
);

// get all courses
router.get("/", courseControllers.getAllCourses);

// get my courses
router.get("/", courseControllers.getAllCourses);

// get single course
router.get("/:id", courseControllers.getSingleCourse);

// update course
router.put(
  "/:id",
  auth(UserRole.instructor),
  requestValidate(courseSchemaValidation.updateCourse),
  courseControllers.updateCourse,
);

// update course status
router.patch(
  "/status",
  auth(UserRole.instructor),
  requestValidate(courseSchemaValidation.updateCourseStatus),
  courseControllers.updateCourseStatus,
);

// delete course
router.delete(
  "/:id",
  auth(UserRole.instructor),
  courseControllers.deleteCourse,
);

const courseRoutes = router;
export default courseRoutes;
