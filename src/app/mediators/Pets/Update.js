import Pet from '../../models/Pet';
import Petfile from '../../models/Petfile';

import CachePet from '../../../lib/CachePet';

import deleteFile from '../../services/deleteFile';
import responses from '../../../config/httpResponses';
import BaseException from '../../exceptions/CustomException';

module.exports = async (
  id,
  userId,
  {
    name,
    type,
    breed_id,
    gender,
    situation,
    birth_date,
    state,
    city,
    description,
    file,
  },
  files
) => {
  try {
    const pet = await Pet.findByPk(id);

    if (!pet) {
      throw new BaseException('PET_NOT_FOUND');
    }

    if (pet.user_id !== userId) {
      throw new BaseException('UNAUTHORIZED_USER');
    }

    const petFiles = await Petfile.findOne({ where: { pet_id: id } });
    const path = petFiles ? petFiles.path : null;

    if (files.length) {
      if (petFiles) {
        petFiles.name = files[0].originalname;
        petFiles.path = files[0].filename;

        await petFiles.save();
      } else {
        await Petfile.create({
          pet_id: pet.id,
          name: files[0].originalname,
          path: files[0].filename,
        });
      }
    } else if (path && !file) {
      await deleteFile(path);
      await petFiles.destroy();
    }

    await pet.update({
      name,
      type,
      breed_id,
      gender,
      situation,
      birth_date,
      state,
      city,
      description,
    });

    await CachePet.invalidatePrefix('pets-list');

    return responses.ok(pet);
  } catch (err) {
    throw err.name === 'CustomException' ? err : new Error(err);
  }
};
