import mediator from '../mediators/PetFiles';

class PetFileController {
  async store(req, res, next) {
    try {
      const { status, data } = await mediator.Store(req.params.id, req.file);

      return res.status(status).json(data);
    } catch (err) {
      return next(err);
    }
  }
}

export default new PetFileController();
