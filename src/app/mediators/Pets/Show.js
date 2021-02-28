import Pet from '../../models/Pet';
import Breed from '../../models/Breed';
import Petfile from '../../models/Petfile';
import responses from '../../../config/httpResponses';
import BaseException from '../../exceptions/CustomException';

module.exports = async (id) => {
  try {
    const pet = await Pet.findByPk(id, {
      include: [
        {
          model: Breed,
          as: 'breed',
          attributes: ['id', 'name'],
        },
        {
          model: Petfile,
          as: 'files',
          attributes: ['id', 'name', 'path', 'url'],
        },
      ],
    });

    if (!pet) {
      throw new BaseException('PET_NOT_FOUND');
    }

    return responses.ok(pet);
  } catch (err) {
    throw err.name === 'CustomException' ? err : new Error(err);
  }
};
