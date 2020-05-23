import crypto from 'crypto';

import User from '../models/User';

import ForgotPasswordMail from '../jobs/ForgotPasswordMail';
import Queue from '../../lib/Queue';

class ForgotPassword {
  async store(req, res) {
    const { email, redirect_url } = req.body;

    const user = await User.findOne({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    const token = crypto.randomBytes(10).toString('hex');

    await user.update({
      token,
      token_created_at: new Date(),
    });

    await Queue.add(ForgotPasswordMail.key, {
      name: user.name,
      email,
      redirect_url,
      token,
    });

    return res.json(user);
  }
}

export default new ForgotPassword();
