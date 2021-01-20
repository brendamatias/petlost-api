import mediator from '../mediators/Keys';

class KeyController {
  async show(req, res) {
    const { status, data } = await mediator.Show(req.params.id, req.userId);

    return res.status(status).json(data);
  }
}

export default new KeyController();
