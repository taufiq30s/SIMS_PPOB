import {Response} from 'express';

type ErrorBody = {
  status: number;
  message: string;
  data?: any;
};

export const successResponse = async (
  res: Response,
  httpCode: number,
  message: string,
  data?: any
) => {
  return res.status(httpCode).json({
    status: 0,
    message: message,
    data: data,
  });
};

export const errorResponse = async (
  res: Response,
  httpCode: number,
  status: number,
  message: string,
  errors?: any
) => {
  const body: ErrorBody = {
    status: status,
    message: errors instanceof Array ? errors[0].msg : message,
    data: null,
  };
  return res.status(httpCode).json(body);
};
