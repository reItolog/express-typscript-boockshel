import { Request, Response, NextFunction } from 'express';

import { admin } from '../shared/firebase';

const VerifyTokenMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { authorization } = req.headers;

  try {
    if (authorization) {
      const token = authorization.split(' ')[1];

      await admin.auth().verifyIdToken(token);

    } else {
      return res.status(401).json({
        data: null,
        error: 'Unauthorized'
      });
    }
  } catch (e) {
    return res.status(403).json({
      data: null,
      error: e.message,
    });
  }
  next();
};


export default VerifyTokenMiddleware;
