import mediator from '../mediators/Files';

class FileController {
  async store(req, res, next) {
    try {
      const { status, data } = await mediator.Store(req.file);

      return res.status(status).json(data);
    } catch (err) {
      return next(err);
    }
  }
}

export default new FileController();
