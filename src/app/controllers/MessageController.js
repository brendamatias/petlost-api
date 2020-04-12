import Message from '../schemas/Message';

class MessageController {
  async index(req, res) {
    const messages = await Message.aggregate([
      {
        $group: {
          originalId: { $first: '$_id' },
          _id: '$key',
          sender: { $first: '$sender' },
          recipient: { $first: '$recipient' },
          content: { $first: '$content' },
          read: { $first: '$read' },
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
        },
      },
    ]);

    return res.json(messages);
  }

  async show(req, res) {
    const messages = await Message.find({
      $or: [
        { sender: [req.userId, req.id] },
        { recipient: [req.userId, req.id] },
      ],
    })
      .sort({ createdAt: 'asc' })
      .limit(20);

    return res.json(messages);
  }

  async update(req, res) {
    // const message = await Message.findByIdAndUpdate(
    //   req.params.id,
    //   {
    //     read: true,
    //   },
    //   { new: true }
    // );
    // return res.json(message);
  }
}

export default new MessageController();
