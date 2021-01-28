import mediator from '../mediators/Messages';

class MessageController {
  async index(req, res, next) {
    try {
      const { status, data } = await mediator.Show(req.userId);

      return res.status(status).json(data);
    } catch (err) {
      return next(err);
    }
  }

  async show(req, res, next) {
    try {
      const { status, data } = await mediator.Show(req.params.id, req.userId);

      return res.status(status).json(data);
    } catch (err) {
      return next(err);
    }
  }

  async update(req, res, next) {
    try {
      const { status, data } = await mediator.Update();

      return res.status(status).json(data);
    } catch (err) {
      return next(err);
    }
  }
}

export default new MessageController();
