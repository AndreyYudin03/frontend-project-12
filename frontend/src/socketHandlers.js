import {
  addChannel,
  editChannel,
  deleteChannel,
} from './store/slices/channelsSlice.js';
import {
  addMessage,
  removeAllMessagesByChannel,
} from './store/slices/messagesSlice.js';

const setupSocketHandlers = (socket, store) => {
  socket.on('newChannel', (payload) => {
    store.dispatch(addChannel(payload));
    console.log('Новый канал: ', payload);
  });

  socket.on('renameChannel', (payload) => {
    store.dispatch(editChannel(payload));
    console.log('Переименован канал: ', payload);
  });

  socket.on('removeChannel', (payload) => {
    store.dispatch(deleteChannel(payload));
    store.dispatch(removeAllMessagesByChannel({ channelId: payload.id }));
    console.log('Удален канал: ', payload);
  });

  socket.on('newMessage', (payload) => {
    store.dispatch(addMessage(payload));
    console.log('Новое сообщение: ', payload);
  });
};

export default setupSocketHandlers;
