import mediator from '../mediators/Pets';

class PetsController {
  async index(req, res) {
    const { status, data } = await mediator.All(req.query);

    return res.status(status).json(data);
  }

  async show(req, res) {
    const { status, data } = await mediator.Show(req.params.id);

    return res.status(status).json(data);
  }

  async store(req, res) {
    const { status, data } = await mediator.Store(req.userId, req.body);

    return res.status(status).json(data);
  }

  async update(req, res) {
    const { status, data } = await mediator.Update(
      req.params.id,
      req.userId,
      req.body
    );

    return res.status(status).json(data);
  }

  async delete(req, res) {
    const { status, data } = await mediator.Delete(req.params.id, req.userId);

    return res.status(status).json(data);
  }
}

export default new PetsController();
