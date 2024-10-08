// react
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Notify from '../components/Notify';

// actions
import { getChannels as fetchChannels } from '../store/slices/channelsSlice.js';
import { getMessages as fetchMessages } from '../store/slices/messagesSlice.js';

// components
import Channels from '../components/Channels';
import Messages from '../components/Messages';
import MessageInput from '../components/Messages/MessageInput.jsx';

// socket
import useSetupSocket from '../hooks/useSocketSetup.jsx';

// selectors
import {
  getChannels,
  getChannelsLoading,
  getChannelsError,
} from '../store/slices/channelsSelectors.js';

import {
  getMessages,
  getMessagesLoading,
  getMessagesError,
} from '../store/slices/messagesSelectors.js';

const ChatPage = () => {
  // hooks
  const dispatch = useDispatch();

  // translation
  const { t } = useTranslation();

  // selectors
  const channels = useSelector(getChannels);
  const channelsLoading = useSelector(getChannelsLoading);
  const channelsError = useSelector(getChannelsError);

  const messages = useSelector(getMessages);
  const messagesLoading = useSelector(getMessagesLoading);
  const messagesError = useSelector(getMessagesError);

  // start socket
  useSetupSocket();

  // load channels and messages
  useEffect(() => {
    dispatch(fetchChannels());
    dispatch(fetchMessages());
  }, [dispatch]);

  // loading spinner
  if (channelsLoading || messagesLoading) {
    return (
      <div className="spinner-border" role="status">
        <span className="sr-only" />
      </div>
    );
  }

  // loading errors
  if (channelsError || messagesError) {
    Notify(t('chatPage.notifications.connectionError'), 'error');
  }

  // render chat
  return (
    <div className="d-flex justify-content-center align-items-center h-100">
      <div className="d-flex flex-column bg-dark w-100 h-100">
        <div className="row flex-grow-1 m-0 h-100">
          <div
            className="col-3 p-2 d-flex flex-column h-100"
            style={{ overflowY: 'auto' }}
          >
            <Channels channels={channels} />
          </div>
          <main className="col-9 d-flex flex-column p-2 h-100 bg-dark">
            <div
              className="flex-grow-1 overflow-auto"
              style={{ maxHeight: '100%' }}
            >
              <Messages messages={messages} />
            </div>
            <div className="mt-auto">
              <MessageInput />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
