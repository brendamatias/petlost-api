import * as Yup from 'yup';

import User from '../../models/User';
import File from '../../models/File';

import responses from '../../../config/httpResponses';
import BaseException from '../../exceptions/CustomException';

module.exports = async ({ email, password }) => {
  try {
    const schema = Yup.object({
      email: Yup.string().email().required(),
      password: Yup.string().required(),
    });

    if (!(await schema.isValid({ email, password }))) {
      throw new BaseException('VALIDATION_FAILS');
    }

    const user = await User.findOne({
      where: { email },
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['id', 'path', 'url'],
        },
      ],
    });

    if (!user) {
      throw new BaseException('USER_NOT_FOUND');
    }

    if (!(await user.checkPassword(password))) {
      throw new BaseException('PASSWORD_INCORRECT');
    }

    return responses.created({
      user,
      token: user.generateToken(),
    });
  } catch (err) {
    return responses.customError(err);
  }
};
