const io = require('socket.io')(3002, {
  cors: {
    origin: 'http://localhost:3001',
  },
});

let users = [];

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) && users.push({ userId, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

io.on('connection', (socket) => {
  //when ceonnect

  //take userId and socketId from user
  socket.on('addUser', (userId) => {
    // console.log('a ' + userId + ' user connected.');
    addUser(userId, socket.id);
    io.emit('getUsers', users);
  });

  //send and get message
  socket.on(
    'sendMessage',
    ({ senderId, receiverId, text, sender_username, uri, is_notification }) => {
      // console.log('senderId: ' + senderId + ' receiverId: ' + receiverId + ' text: ' + text);
      const user = getUser(receiverId);
      if (user) {
        io.to(user.socketId).emit('getMessage', {
          senderId,
          sender_username,
          text,
          uri,
          is_notification,
        });

        const sender = getUser(senderId);
        io.to(sender?.socketId).emit('getMessage', {
          isOnline: 'true',
        });
      } else {
        const sender = getUser(senderId);
        io.to(sender?.socketId).emit('getMessage', {
          isOnline: 'false',
        });
      }
    }
  );

  //when disconnect
  socket.on('disconnect', () => {
    // console.log('a user disconnected!');
    removeUser(socket.id);
    io.emit('getUsers', users);
  });
});
