import Pet from '../../models/Pet';
import Chat from '../../models/Chat';

import responses from '../../../config/httpResponses';
import BaseException from '../../exceptions/CustomException';
import publishPubnub from '../../services/publishPubnub';

module.exports = async (userId, { pet_id, message }) => {
  try {
    const channel = `channel.${pet_id}.${userId}`;
    const petExists = await Pet.findOne({
      where: { id: pet_id },
    });

    if (!petExists) {
      throw new BaseException('PET_NOT_FOUND');
    }

    let chat = await Chat.findOne({
      where: {
        pet_id,
        sender_id: userId,
      },
    });

    if (!chat) {
      chat = await Chat.create({
        message,
        pet_id,
        sender_id: userId,
      });
    }

    await publishPubnub(channel, userId, message);

    return responses.created(chat);
  } catch (err) {
    throw err.name === 'CustomException' ? err : new Error(err);
  }
};
