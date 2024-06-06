import { Request, Response } from "express";

const notFound = (req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message:
      "Sorry, you are request on wrong url. Please try to request a valid url",
    error: {},
  });
};

export default notFound;
