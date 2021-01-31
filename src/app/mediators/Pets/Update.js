import Pet from '../../models/Pet';
import Address from '../../models/Address';
import CachePet from '../../../lib/CachePet';

import responses from '../../../config/httpResponses';
import BaseException from '../../exceptions/CustomException';

module.exports = async (id, userId, { name, type, situation, address_id }) => {
  try {
    const pet = await Pet.findByPk(id);

    if (!pet) {
      throw new BaseException('PET_NOT_FOUND');
    }

    if (pet.user_id !== userId) {
      throw new BaseException('UNAUTHORIZED_USER');
    }

    if (address_id) {
      const addressExists = await Address.findOne({
        where: { id: address_id },
      });

      if (!addressExists) {
        throw new BaseException('ADDRESS_NOT_FOUND');
      }
    }

    await pet.update({ name, type, situation, address_id });

    await CachePet.invalidatePrefix('pets-list');

    return responses.ok(pet);
  } catch (err) {
    throw err.name === 'CustomException' ? err : new Error(err);
  }
};
