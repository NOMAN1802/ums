/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';

const notFound = (req: Request, res: Response, next: NextFunction) => {
  const error = new Error('API Not Found !!');
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: error.message,
    error: '',
  });
};

export default notFound;
