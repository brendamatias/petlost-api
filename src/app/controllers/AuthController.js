import mediator from '../mediators/Auth';

class AuthController {
  async store(req, res, next) {
    try {
      const { status, data } = await mediator.Store(req.body);

      return res.status(status).json(data);
    } catch (err) {
      return next(err);
    }
  }
}

export default new AuthController();
