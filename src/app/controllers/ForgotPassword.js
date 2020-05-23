import crypto from 'crypto';

import User from '../models/User';
import Mail from '../../lib/Mail';

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

    Mail.sendMail({
      to: `${user.name} <${email}>`,
      subject: 'Recuperação de senha',
      template: 'forgot',
      context: {
        user: user.name,
        link: `${redirect_url}?token=${token}`,
      },
    });

    return res.json(user);
  }
}

export default new ForgotPassword();
