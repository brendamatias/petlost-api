import mediator from '../mediators/Breeds';
import validator from '../validators/Breeds';

class BreedController {
  async index(req, res, next) {
    try {
      await validator.All(req.query);

      const { status, data } = await mediator.All(req.query);

      return res.status(status).json(data);
    } catch (err) {
      return next(err);
    }
  }
}

export default new BreedController();
