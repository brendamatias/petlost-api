import File from '../models/File';

class FileController {
  async store(req, res) {
    const { originalname: name, key } = req.file;

    const file = await File.create({
      name,
      path: key,
    });

    return res.json(file);
  }
}

export default new FileController();
