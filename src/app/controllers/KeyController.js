import mediator from '../mediators/Keys';

class KeyController {
  async show(req, res, next) {
    try {
      const { status, data } = await mediator.Show(req.params.id, req.userId);

      return res.status(status).json(data);
    } catch (err) {
      return next(err);
    }
  }
}

export default new KeyController();
