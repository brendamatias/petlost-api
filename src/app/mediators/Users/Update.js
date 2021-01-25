import * as Yup from 'yup';

import User from '../../models/User';

import responses from '../../../config/httpResponses';
import BaseException from '../../exceptions/CustomException';

module.exports = async (
  userId,
  file,
  { name, email, oldPassword, password, confirmPassword }
) => {
  try {
    const schema = Yup.object({
      name: Yup.string(),
      email: Yup.string().email(),
      oldPassword: Yup.string().min(6),
      password: Yup.string()
        .min(6)
        .when('oldPassword', (oldPasswordV, field) =>
          oldPasswordV ? field.required() : field
        ),
      confirmPassword: Yup.string().when('password', (passwordV, field) =>
        passwordV ? field.required().oneOf([Yup.ref('password')]) : field
      ),
    });

    if (
      !(await schema.isValid({
        name,
        email,
        oldPassword,
        password,
        confirmPassword,
      }))
    ) {
      throw new BaseException('VALIDATION_FAILS');
    }

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
