import { ZodSchema } from "zod";
import catchAsync from "../utils/catchAsync";

const requestValidate = <T>(schema: ZodSchema<T>) => {
  return catchAsync(async (req, res, next) => {
    const result = await schema.parseAsync(req.body);
    req.body = result;
    next();
  });
};

export default requestValidate;
