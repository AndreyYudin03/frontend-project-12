import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import leoProfanity from 'leo-profanity';
import { sendMessage } from '../../store/slices/messagesSlice.js';

const MessageInput = () => {
  leoProfanity.add(leoProfanity.getDictionary('ru'));

  const [text, setText] = useState('');
  const { channelId } = useSelector((state) => state.channels);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleSendMessage = () => {
    if (text.trim() !== '') {
      dispatch(sendMessage({ channelId, text }));
      setText('');
    }
  };

  return (
    <form onSubmit={(e) => e.preventDefault()} className="d-flex">
      <input
        type="text"
        className="form-control me-2"
        placeholder={t('chatPage.messages.placeholder')}
        value={text}
        onChange={(e) => setText(e.target.value)}
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
