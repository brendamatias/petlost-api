import mediator from '../mediators/Users';

class UserController {
  async show(req, res) {
    const { status, data } = await mediator.Show(req.params.id);

    return res.status(status).json(data);
  }

  async store(req, res) {
    const { status, data } = await mediator.Store(req.body);

    return res.status(status).json(data);
  }

  async update(req, res) {
    const { status, data } = await mediator.Update(req.userId, req.body);

    return res.status(status).json(data);
  }
}

export default new UserController();
