import createHttpError from "http-errors";

export const validateBody = (schema) => async (req, res, next) => {
  try {
    await schema.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (err) {
    const formattedErrors = err.details.map(detail => ({
      field: detail.path.join('.'),
      message: detail.message.replace(/["]/g, ''),
    }));

    const error = createHttpError(400, 'The data did not pass validation.', {
      errors: formattedErrors,
    });

    next(error);
  }
};