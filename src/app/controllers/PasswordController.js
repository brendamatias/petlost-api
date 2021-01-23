import mediator from '../mediators/Password';

class PasswordController {
  async store(req, res, next) {
    try {
      const { status, data } = await mediator.Store(req.body);

      return res.status(status).json(data);
    } catch (err) {
      return next(err);
    }
  }

  async update(req, res, next) {
    try {
      const { status, data } = await mediator.Update(req.body);

      return res.status(status).json(data);
    } catch (err) {
      return next(err);
    }
  }
}

export default new PasswordController();
