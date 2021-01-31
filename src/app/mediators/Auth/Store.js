import User from '../../models/User';

import responses from '../../../config/httpResponses';
import BaseException from '../../exceptions/CustomException';

module.exports = async ({ email, password }) => {
  try {
    const user = await User.findOne({
      where: { email },
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
    throw err.name === 'CustomException' ? err : new Error(err);
  }
};
