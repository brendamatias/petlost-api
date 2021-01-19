import mediator from '../mediators/Auth';

class AuthController {
  async store(req, res) {
    const { email, password } = req.body;

    const { status, data } = await mediator.Store({ email, password }, res);

    return res.status(status).json(data);
  }
}

export default new AuthController();
