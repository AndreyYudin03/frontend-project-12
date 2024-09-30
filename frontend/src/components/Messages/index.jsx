// react
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// actions
import { addMessage } from '../../store/slices/messagesSlice.js';

// socket
import socket from '../../socketClient.js';

const Messages = ({ messages }) => {
  // hooks
  const dispatch = useDispatch();

  // selectors
  const { token } = useSelector((state) => state.auth);
  const { channelId } = useSelector((state) => state.channels);

  // receiving messages
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

  // render messages
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
              display: 'inline-block',
              marginBottom: '8px',
              padding: '8px 12px',
              borderRadius: '15px',
              alignSelf: 'flex-start',
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
