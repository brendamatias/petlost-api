import User from '../../models/User';

import responses from '../../../config/httpResponses';
import BaseException from '../../exceptions/CustomException';

module.exports = async ({ name, email, password }) => {
  try {
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
