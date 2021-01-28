import crypto from 'crypto';

import User from '../../models/User';

import ForgotPasswordMail from '../../jobs/ForgotPasswordMail';
import Queue from '../../../lib/Queue';

import responses from '../../../config/httpResponses';
import BaseException from '../../exceptions/CustomException';

module.exports = async ({ email }) => {
  try {
    const user = await User.findOne({
      where: { email },
    });

    if (!user) {
      throw new BaseException('USER_NOT_FOUND');
    }

    const token = crypto.randomBytes(10).toString('hex');

    await user.update({
      token,
      token_created_at: new Date(),
    });

    await Queue.add(ForgotPasswordMail.key, {
      name: user.name,
      email,
      redirect_url: `${process.env.WEB_URL}/reset-password`,
      token,
    });

    return responses.noContent();
  } catch (err) {
    throw err.name === 'CustomException' ? err : new Error(err);
  }
};
