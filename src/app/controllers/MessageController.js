import mediator from '../mediators/Messages';

class MessageController {
  async index(req, res) {
    const { status, data } = await mediator.Show(req.userId);

    return res.status(status).json(data);
  }

  async show(req, res) {
    const { status, data } = await mediator.Show(req.params.id, req.userId);

    return res.status(status).json(data);
  }

  async update(req, res) {
    const { status, data } = await mediator.Update();

    return res.status(status).json(data);
  }
}

export default new MessageController();
