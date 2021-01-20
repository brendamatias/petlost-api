import mediator from '../mediators/PetFiles';

class PetFileController {
  async store(req, res) {
    const { status, data } = await mediator.Store(req.params.id, req.file);

    return res.status(status).json(data);
  }
}

export default new PetFileController();
