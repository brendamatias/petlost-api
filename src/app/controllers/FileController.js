import mediator from '../mediators/Files';

class FileController {
  async store(req, res) {
    const { status, data } = await mediator.Store(req.file);

    return res.status(status).json(data);
  }
}

export default new FileController();
