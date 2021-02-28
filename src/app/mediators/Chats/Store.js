import Pet from '../../models/Pet';
import Chat from '../../models/Chat';

import responses from '../../../config/httpResponses';
import BaseException from '../../exceptions/CustomException';

module.exports = async (userId, { pet_id, message }) => {
  try {
    const petExists = await Pet.findOne({
      where: { id: pet_id },
    });

    if (!petExists) {
      throw new BaseException('PET_NOT_FOUND');
    }

    const chat = await Chat.create({
      message,
      pet_id,
      sender_id: userId,
    });

    return responses.created(chat);
  } catch (err) {
    throw err.name === 'CustomException' ? err : new Error(err);
  }
};
