import mediator from '../mediators/Chats';
import validator from '../validators/Chats';

class ChatController {
  async store(req, res, next) {
    try {
      await validator.Store(req.body);

      const { status, data } = await mediator.Store(req.userId, req.body);

      return res.status(status).json(data);
    } catch (err) {
      return next(err);
    }
  }
}

export default new ChatController();
