import * as Yup from 'yup';

import User from '../../models/User';

import responses from '../../../config/httpResponses';
import BaseException from '../../exceptions/CustomException';

module.exports = async ({ name, email, password }) => {
  try {
    const schema = Yup.object({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().required().min(6),
    });

    if (!(await schema.isValid({ name, email, password }))) {
      throw new BaseException('VALIDATION_FAILS');
    }

    const userExists = await User.findOne({ where: { email } });

    if (userExists) {
      throw new BaseException('USER_ALREADY_CREATED');
    }

    const user = await User.create({ name, email, password });

    return responses.created(user);
  } catch (err) {
    throw err.name === 'CustomException' ? err : new Error(err);
  }
};
