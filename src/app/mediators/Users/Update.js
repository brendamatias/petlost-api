import * as Yup from 'yup';

import User from '../../models/User';
import File from '../../models/File';

import responses from '../../../config/httpResponses';
import BaseException from '../../exceptions/CustomException';

module.exports = async (
  userId,
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

    let user = await User.findByPk(userId);

    if (!user) {
      throw new BaseException('USER_NOT_FOUND');
    }

    if (email !== user.email) {
      const userExists = await User.findOne({
        where: { email },
      });

      if (userExists) {
        throw new BaseException('USER_ALREADY_CREATED');
      }
    }

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      throw new BaseException('USER_ALREADY_CREATED');
    }

    await user.update({ name, email, password });

    user = await User.findByPk(userId, {
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['id', 'path', 'url'],
        },
      ],
    });

    return responses.ok(user);
  } catch (err) {
    return responses.customError(err);
  }
};
