import File from '../../models/File';
import Petfile from '../../models/Petfile';

import CachePet from '../../../lib/CachePet';
import responses from '../../../config/httpResponses';

module.exports = async (id, { originalname: name, filename: path }) => {
  try {
    const file = await File.create({
      name,
      path,
    });

    const petFile = await Petfile.create({
      pet_id: id,
      file_id: file.id,
    });

    await CachePet.invalidatePrefix('pets-list');

    return responses.created(petFile);
  } catch (err) {
    return responses.customError(err);
  }
};
