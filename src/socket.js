import Pet from './app/models/Pet';
import Chat from './app/models/Chat';
import User from './app/models/User';

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
        attributes: ['id', 'name'],
      },
    ],
    where: { sender_id: clientInfo.user_id },
  });

  socket.emit(`getChats:${clientInfo.user_id}`, chats);
};
