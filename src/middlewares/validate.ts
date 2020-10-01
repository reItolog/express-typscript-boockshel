import { Request, Response, NextFunction } from 'express';
import { string, object } from 'yup';

const SigninValidateMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const signinType = object({
    email: string().email().required().trim(),
    password: string().required().trim(),
  });

  try {
    await signinType.validate(req.body);
  } catch (validationErrors) {
    return res.json({
      data: null,
      error: validationErrors.message,
    });
  }
  next();
};

const SignupValidateMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const signupType = object({
    first_name: string().required().trim(),
    last_name: string().required().trim(),
    email: string().email().required().trim(),
    password: string().required().trim(),
  });
  try {
    await signupType.validate(req.body);
  } catch (validationErrors) {
    return res.json({
      data: null,
      error: validationErrors.message,
    });
  }
  next();
};

export { SigninValidateMiddleware, SignupValidateMiddleware };
