import mediator from '../mediators/Users';

class UserController {
  async show(req, res, next) {
    try {
      const { status, data } = await mediator.Show(req.params.id);

      return res.status(status).json(data);
    } catch (err) {
      return next(err);
    }
  }

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
      const { status, data } = await mediator.Update(
        req.userId,
        req.file,
        req.body
      );

      return res.status(status).json(data);
    } catch (err) {
      return next(err);
    }
  }
}

export default new UserController();
