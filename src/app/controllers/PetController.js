import mediator from '../mediators/Pets';
import validator from '../validators/Pets';

class PetController {
  async index(req, res, next) {
    try {
      await validator.All(req.query);

      const { status, data } = await mediator.All(req.query);

      return res.status(status).json(data);
    } catch (err) {
      return next(err);
    }
  }

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
      await validator.Store(req.body);

      const { status, data } = await mediator.Store(
        req.userId,
        req.body,
        req.files
      );

      return res.status(status).json(data);
    } catch (err) {
      return next(err);
    }
  }

  async update(req, res, next) {
    try {
      await validator.Update(req.body);

      const { status, data } = await mediator.Update(
        req.params.id,
        req.userId,
        req.body,
        req.files
      );

      return res.status(status).json(data);
    } catch (err) {
      return next(err);
    }
  }

  async delete(req, res, next) {
    try {
      const { status, data } = await mediator.Delete(req.params.id, req.userId);

      return res.status(status).json(data);
    } catch (err) {
      return next(err);
    }
  }
}

export default new PetController();
