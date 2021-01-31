import User from '../../models/User';

import responses from '../../../config/httpResponses';
import BaseException from '../../exceptions/CustomException';

module.exports = async (
  userId,
  file,
  { name, email, oldPassword, password }
) => {
  try {
    const user = await User.findByPk(userId);

    if (!user) {
      throw new BaseException('USER_NOT_FOUND');
    }

    if (email && email !== user.email) {
      const userExists = await User.findOne({
        where: { email },
      });

      if (userExists) {
        throw new BaseException('USER_ALREADY_CREATED');
      }
    }

    if (password && !oldPassword) {
      throw new BaseException('OLD_PASSWORD_REQUIRED');
    }

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      throw new BaseException('PASSWORD_DOES_NOT_MATCH');
    }

    let avatar = user.avatar || null;

    if (file) {
      avatar = file.key;
    }

    await user.update({ name, email, password, avatar });

    return responses.ok(user);
  } catch (err) {
    // TO DO - remover file

    throw err.name === 'CustomException' ? err : new Error(err);
  }
};
