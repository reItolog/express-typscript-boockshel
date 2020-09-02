import express from 'express';
import { join } from 'path';

const StaticMiddleware = express.static(join(process.cwd(), 'public'));

export default StaticMiddleware;