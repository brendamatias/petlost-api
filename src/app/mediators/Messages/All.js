import Message from '../../schemas/Message';
import responses from '../../../config/httpResponses';

module.exports = async (userId) => {
  try {
    const messages = await Message.aggregate([
      { $match: { $or: [{ sender: userId }, { recipient: userId }] } },
      { $sort: { createdAt: -1 } },
      {
        $group: {
          originalId: { $first: '$_id' },
          _id: '$key',
          sender: { $first: '$sender' },
          recipient: { $first: '$recipient' },
          content: { $first: '$content' },
          read: { $first: '$read' },
          createdAt: { $first: '$createdAt' },
        },
      },
      {
        $project: {
          _id: '$originalId',
          key: '$_id',
          sender: '$sender',
          recipient: '$recipient',
          content: '$content',
          read: '$read',
          createdAt: '$createdAt',
        },
      },
    ]);

    return responses.ok(messages);
  } catch (err) {
    throw err.name === 'CustomException' ? err : new Error(err);
  }
};
