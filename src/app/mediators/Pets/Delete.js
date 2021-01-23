import CachePet from '../../../lib/CachePet';

import Pet from '../../models/Pet';

import responses from '../../../config/httpResponses';
import BaseException from '../../exceptions/CustomException';

module.exports = async (id, userId) => {
  try {
    const pet = await Pet.findByPk(id);

    if (!pet) {
      throw new BaseException('PET_NOT_FOUND');
    }

    if (pet.user_id !== userId) {
      throw new BaseException('UNAUTHORIZED_USER');
    }

    await pet.destroy();

    await CachePet.invalidatePrefix('pets-list');

    return responses.noContent();
  } catch (err) {
    throw err.name === 'CustomException' ? err : new Error(err);
  }
};
