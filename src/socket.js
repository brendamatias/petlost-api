import Pet from './app/models/Pet';
import Chat from './app/models/Chat';
import User from './app/models/User';
import Petfile from './app/models/Petfile';

export default async (socket, clientInfo) => {
  const chats = await Chat.findAll({
    include: [
      {
        model: User,
        as: 'sender',
        attributes: ['id', 'name', 'avatar', 'avatar_url'],
      },
      {
        model: Pet,
        as: 'pet',
        attributes: ['id', 'name', 'user_id'],
        include: [
          {
            model: User,
            as: 'user',
            attributes: ['id', 'name', 'avatar', 'avatar_url'],
          },
          {
            model: Petfile,
            as: 'files',
            attributes: ['id', 'name', 'path', 'url'],
          },
        ],
      },
    ],
    $or: [
      [
        { 'pet.user_id': clientInfo.user_id },
        { sender_id: clientInfo.user_id },
      ],
    ],
  });

  socket.emit(`getChats:${clientInfo.user_id}`, chats);
};
