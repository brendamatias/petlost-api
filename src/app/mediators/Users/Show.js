import User from '../../models/User';

import responses from '../../../config/httpResponses';
import BaseException from '../../exceptions/CustomException';

module.exports = async (id) => {
  try {
    const user = await User.findByPk(id);

    if (!user) {
      throw new BaseException('USER_NOT_FOUND');
    }

    return responses.ok(user);
  } catch (err) {
    throw err.name === 'CustomException' ? err : new Error(err);
  }
};
