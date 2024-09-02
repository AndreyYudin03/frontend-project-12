import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addMessage } from '../../store/slices/messagesSlice.js';
import socket from '../../socket.js';

const Messages = ({ messages }) => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { channelId } = useSelector((state) => state.channels);

  useEffect(() => {
    if (token) {
      socket.on('newMessage', (payload) => {
        dispatch(addMessage(payload));
        console.log('new message: ', payload);
      });
    }

    return () => {
      socket.off('newMessage');
      console.log('Message socket disconnected');
    };
  }, [dispatch, token]);

  if (!messages || messages.length === 0) {
    return <div>No messages available</div>;
  }

  return (
    <ul className="list-group overflow-auto" style={{ maxHeight: '100%' }}>
      {messages
        .filter((message) => message.channelId === channelId)
        .map((message) => (
          <li
            key={message.id}
            className="list-group-item"
            style={{
              wordBreak: 'break-word',
              whiteSpace: 'pre-wrap',
              display: 'inline-block', // Сообщение занимает столько места, сколько необходимо
              // maxWidth: "75%", // Ограничение максимальной ширины сообщения
              marginBottom: '8px', // Отступ между сообщениями
              padding: '8px 12px', // Внутренние отступы для сообщения
              // backgroundColor: "#f8f9fa", // Светло-серый фон
              borderRadius: '15px', // Закругленные углы
              alignSelf: 'flex-start', // Сообщения будут выравниваться по левому краю
            }}
          >
            <strong>
              {message.username}
              :
            </strong>
            {' '}
            {message.body}
          </li>
        ))}
    </ul>
  );
};

export default Messages;
