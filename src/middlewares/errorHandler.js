// import { HttpError } from 'http-errors';

export const errorHandler = (err, req, res, next) => {
  const status = err.status || 500;

  const response = {
    status,
    message: err.message || 'Something went wrong',
  };

  if (err.errors) {
    response.errors = err.errors;
  }

  res.status(status).json(response);
};