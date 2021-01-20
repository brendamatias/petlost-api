import * as Yup from 'yup';
import moment from 'moment';

import User from '../../models/User';

import responses from '../../../config/httpResponses';
import BaseException from '../../exceptions/CustomException';

module.exports = async ({ token, password, confirmPassword }) => {
  try {
    const schema = Yup.object({
      token: Yup.string().required(),
      password: Yup.string().min(6).required(),
      confirmPassword: Yup.string()
        .required()
        .oneOf([Yup.ref('password')]),
    });

    if (!(await schema.isValid({ token, password, confirmPassword }))) {
      throw new BaseException('VALIDATION_FAILS');
    }

    const user = await User.findOne({
      where: { token },
    });

    if (!user) {
      throw new BaseException('TOKEN_INVALID');
    }

    const tokenExpired = moment()
      .subtract('2', 'days')
      .isAfter(user.token_created_at);

    if (tokenExpired) {
      throw new BaseException('TOKEN_EXPIRED');
    }

    await user.update({
      token: null,
      token_created_at: null,
      password,
    });

    return responses.ok(user);
  } catch (err) {
    return responses.customError(err);
  }
};
