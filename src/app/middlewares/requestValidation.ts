import { AnyZodObject } from "zod";
import catchAsync from "../utils/catchAsync";

const requestValidate = (schema: AnyZodObject) => {
  return catchAsync(async (req, res, next) => {
    const result = await schema.parseAsync({
      body: req.body,
    });
    req.body = result.body;
    next();
  });
};

export default requestValidate;
