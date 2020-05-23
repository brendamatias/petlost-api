import File from '../models/File';
import Petfile from '../models/Petfile';

import CachePet from '../../lib/CachePet';

class PetfilesController {
  async store(req, res) {
    const { originalname: name, filename: path } = req.file;

    const file = await File.create({
      name,
      path,
    });

    const petFile = await Petfile.create({
      pet_id: req.params.id,
      file_id: file.id,
    });

    await CachePet.invalidatePrefix('pets-list');

    return res.json(petFile);
  }
}

export default new PetfilesController();
