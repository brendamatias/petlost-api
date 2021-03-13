import CachePet from '../../../lib/CachePet';

import Pet from '../../models/Pet';
import Chat from '../../models/Chat';

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

    pet.status = false;

    await pet.save();

    const chat = await Chat.findOne({
      where: {
        pet_id: id,
      },
    });

    if (chat) {
      chat.active = false;
      await chat.save();
    }

    await CachePet.invalidatePrefix('pets-list');

    return responses.noContent();
  } catch (err) {
    throw err.name === 'CustomException' ? err : new Error(err);
  }
};
