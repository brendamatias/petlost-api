import mediator from '../mediators/Auth';

class AuthController {
  async store(req, res) {
    const { status, data } = await mediator.Store(req.body);

    return res.status(status).json(data);
  }
}

export default new AuthController();
