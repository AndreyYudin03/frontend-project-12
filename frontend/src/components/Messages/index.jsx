import React from 'react';
import { useSelector } from 'react-redux';
import { getCurrentChannelId } from '../../store/slices/channelsSelectors';

const Messages = ({ messages }) => {
  const channelId = useSelector(getCurrentChannelId);

  if (!messages || messages.length === 0) {
    return <div>Сообщений нет</div>;
  }

  return (
    <ul className="list-group overflow-auto" style={{ maxHeight: '100%' }}>
      {messages
        .filter((message) => message.channelId === channelId)
        .map((message) => (
          <li key={message.id} className="list-group-item">
            <strong>
              {message.username}
              :
              {' '}
            </strong>
            {message.body}
          </li>
        ))}
    </ul>
  );
};

export default Messages;
