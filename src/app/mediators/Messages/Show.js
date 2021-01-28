import Message from '../../schemas/Message';
import responses from '../../../config/httpResponses';

module.exports = async (id, userId) => {
  try {
    const messages = await Message.find({
      $or: [
        {
          $and: [{ sender: userId }, { recipient: id }],
        },
        {
          $and: [{ sender: id }, { recipient: userId }],
        },
      ],
    }).sort({ createdAt: 'asc' });

    return responses.ok(messages);
  } catch (err) {
    throw err.name === 'CustomException' ? err : new Error(err);
  }
};
