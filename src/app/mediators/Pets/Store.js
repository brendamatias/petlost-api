import Pet from '../../models/Pet';
import Petfile from '../../models/Petfile';

import Address from '../../models/Address';
import CachePet from '../../../lib/CachePet';

import responses from '../../../config/httpResponses';
import BaseException from '../../exceptions/CustomException';

module.exports = async (
  userId,
  { name, type, situation, status, address_id },
  files
) => {
  try {
    const addressExists = await Address.findOne({
      where: { id: address_id },
    });

    if (!addressExists) {
      throw new BaseException('ADDRESS_NOT_FOUND');
    }

    const pet = await Pet.create({
      name,
      type,
      situation,
      status: status || true,
      address_id,
      user_id: userId,
    });

    await Promise.all(
      files.map(async (file) => {
        await Petfile.create({
          pet_id: pet.id,
          name: file.originalname,
          path: file.filename,
        });
      })
    );

    await CachePet.invalidatePrefix('pets-list');

    return responses.created(pet);
  } catch (err) {
    throw err.name === 'CustomException' ? err : new Error(err);
  }
};
