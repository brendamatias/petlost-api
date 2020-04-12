import Message from './app/schemas/Message';

export default async (socket, data) => {
  const { content, sender, key, recipient } = data;
  socket.broadcast.emit('received');

  await Message.create({
    content,
    key,
    sender,
    recipient,
  });
};
