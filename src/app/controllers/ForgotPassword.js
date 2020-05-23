import * as Yup from 'yup';

import crypto from 'crypto';
import moment from 'moment';

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

  async update(req, res) {
    const schema = Yup.object({
      token: Yup.string().required(),
      password: Yup.string().min(6).required(),
      confirmPassword: Yup.string()
        .required()
        .oneOf([Yup.ref('password')]),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    const { token, password } = req.body;

    const user = await User.findOne({
      where: { token },
    });

    if (!user) {
      return res.status(404).json({ error: 'Token not valid.' });
    }

    const tokenExpired = moment()
      .subtract('2', 'days')
      .isAfter(user.token_created_at);

    if (tokenExpired) {
      return res.status(401).json({ error: 'Token expired.' });
    }

    await user.update({
      token: null,
      token_created_at: null,
      password,
    });

    const { id, name, email } = user;

    return res.json({ id, name, email });
  }
}

export default new ForgotPassword();
