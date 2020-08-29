import express from 'express';
import { Request, Response, NextFunction } from 'express';

const BodyParserMiddleware = (req: Request, resp: Response, next: NextFunction) => {
   express.json();
  next();
};

export default BodyParserMiddleware;