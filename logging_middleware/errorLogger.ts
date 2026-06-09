// errorLogger.ts
//it is used for the error handling in the application.

import { Request, Response, NextFunction } from "express";

export const errorLogger = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const timestamp = new Date().toISOString();

  console.error(
    `[${timestamp}] ${req.method} ${req.originalUrl} - ${err.message}`
  );

  res.status(500).json({
    success: false,
    message: err.message
  });
};