import bcrypt from 'bcryptjs';
import User from '../models/User';
import Message from '../schemas/Message';

class KeyController {
  async show(req, res) {
    const messages = await Message.findOne({
      $or: [
        {
          $and: [{ sender: req.userId }, { recipient: req.params.id }],
        },
        {
          $and: [{ sender: req.params.id }, { recipient: req.userId }],
        },
      ],
    }).sort({ createdAt: 'desc' });

    if (!messages) {
      const { id, name, email } = await User.findByPk(req.userId);
      const secretText = id + name + email + process.env.APP_SECRET;
      const key = await bcrypt.hash(secretText, 8);

      return res.json({ key });
    }

    return res.json({ key: messages.key });
  }
}

export default new KeyController();
