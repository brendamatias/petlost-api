import mediator from '../mediators/Auth';
import validator from '../validators/Auth';

class AuthController {
  async store(req, res, next) {
    try {
      await validator.Store(req.body);

      const { status, data } = await mediator.Store(req.body);

      return res.status(status).json(data);
    } catch (err) {
      return next(err);
    }
  }
}

export default new AuthController();
