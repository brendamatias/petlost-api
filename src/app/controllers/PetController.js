import mediator from '../mediators/Pets';

class PetController {
  async index(req, res, next) {
    try {
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
      const { status, data } = await mediator.Update(
        req.params.id,
        req.userId,
        req.body
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
