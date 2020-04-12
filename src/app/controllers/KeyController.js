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
      return res.status(401).json({ error: 'Key not found.' });
    }

    return res.json({ key: messages.key });
  }
}

export default new KeyController();
