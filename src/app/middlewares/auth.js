import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import User from '../models/User';
import BaseException from '../exceptions/CustomException';

import authConfig from '../../config/auth';

export default async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new BaseException('TOKEN_NOT_PROVIDED');
    }

    const [, token] = authHeader.split(' ');

    const decoded = await promisify(jwt.verify)(token, authConfig.secret);

    const user = await User.findByPk(decoded.id);

    if (!user) {
      throw new BaseException('TOKEN_INVALID');
    }

    req.userId = user.id;

    return next();
  } catch (err) {
    return next(err);
  }
};
