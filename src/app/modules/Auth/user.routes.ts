import { Router } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";

const router = Router();

// test register
router.get(
  "/",
  catchAsync(async (req, res) => {
    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "User is successfully Registered",
      data: "register data",
    });
  }),
);

const userRoutes = router;
export default userRoutes;
