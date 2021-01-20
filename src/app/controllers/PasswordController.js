import mediator from '../mediators/Password';

class PasswordController {
  async store(req, res) {
    const { status, data } = await mediator.Store(req.body);

    return res.status(status).json(data);
  }

  async update(req, res) {
    const { status, data } = await mediator.Update(req.body);

    return res.status(status).json(data);
  }
}

export default new PasswordController();
