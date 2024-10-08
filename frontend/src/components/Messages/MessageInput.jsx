import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { sendMessage } from '../../store/slices/messagesSlice.js';

// profanityFilter
import profanityFilter from '../../utils/profanityFilter';

// selectors
import { getCurrentChannelId } from '../../store/slices/channelsSelectors.js';

const MessageInput = () => {
  const [text, setText] = useState('');
  const channelId = useSelector(getCurrentChannelId);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleSendMessage = () => {
    if (text.trim() !== '') {
      const filteredMessage = profanityFilter(text);
      console.log('filteredMessage: ', text);
      dispatch(sendMessage({ channelId, text: filteredMessage }));
      setText('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <form onSubmit={(e) => e.preventDefault()} className="d-flex">
      <input
        type="text"
        aria-label="Новое сообщение"
        className="form-control me-2"
        placeholder={t('chatPage.messages.placeholder')}
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        style={{ flexGrow: 1 }}
      />
      <button
        type="button"
        className="btn btn-primary"
        onClick={handleSendMessage}
        disabled={text.trim() === ''}
      >
        {t('chatPage.messages.submit')}
      </button>
    </form>
  );
};

export default MessageInput;
