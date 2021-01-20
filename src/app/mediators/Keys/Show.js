import bcrypt from 'bcryptjs';
import User from '../../models/User';
import Message from '../../schemas/Message';
import responses from '../../../config/httpResponses';

module.exports = async (id, userId) => {
  try {
    const messages = await Message.findOne({
      $or: [
        {
          $and: [{ sender: userId }, { recipient: id }],
        },
        {
          $and: [{ sender: id }, { recipient: userId }],
        },
      ],
    }).sort({ createdAt: 'desc' });

    let key = messages ? messages.key : null;

    if (!messages) {
      const user = await User.findByPk(userId);
      const secretText = id + user.name + user.email + process.env.APP_SECRET;
      key = await bcrypt.hash(secretText, 8);
    }

    return responses.ok({ key });
  } catch (err) {
    return responses.customError(err);
  }
};
