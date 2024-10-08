// react
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

// profanityFilter
import profanityFilter from '../../utils/profanityFilter';

// actions
import {
  setChannelId,
  newChannel,
  renameChannel,
  removeChannel,
} from '../../store/slices/channelsSlice';
import ChannelItem from './ChannelItem';
import {
  AddChannelModal,
  RenameChannelModal,
  RemoveChannelModal,
} from './Modals/index.js';
import Notify from '../Notify';

// selectors
import { getCurrentChannelId } from '../../store/slices/channelsSelectors';

const ChannelList = ({ channels }) => {
  const dispatch = useDispatch();
  const channelId = useSelector(getCurrentChannelId);
  const { t } = useTranslation();

  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [selectedChannel, setSelectedChannel] = useState(null);

  const handleSetChannel = (id) => {
    dispatch(setChannelId(id));
  };

  const handleModalSwitch = (type, channel = null) => {
    setModalType(type);
    setSelectedChannel(channel);
    setShowModal(!showModal);
  };

  const handleAddChannel = (values, { setSubmitting }) => {
    const filteredName = profanityFilter(values.channelName);
    dispatch(newChannel({ name: filteredName }))
      .then(() => Notify(t('chatPage.notifications.addChannel'), 'success'))
      .catch(() => Notify(t('chatPage.notifications.addChannelError'), 'error'));
    setSubmitting(false);
    handleModalSwitch('');
  };

  const handleRenameChannel = (values, { setSubmitting }) => {
    const filteredName = profanityFilter(values.channelName);
    dispatch(
      renameChannel({
        channelId: selectedChannel.id,
        name: filteredName,
      }),
    )
      .then(() => Notify(t('chatPage.notifications.renameChannel'), 'success'))
      .catch(() => Notify(t('chatPage.notifications.renameChannelError'), 'error'));
    setSubmitting(false);
    handleModalSwitch('');
  };

  const handleRemoveChannel = () => {
    dispatch(removeChannel({ channelId: selectedChannel.id }))
      .then(() => Notify(t('chatPage.notifications.removeChannel'), 'success'))
      .catch(() => Notify(t('chatPage.notifications.removeChannelError'), 'error'));
    handleModalSwitch('');
  };

  // render channels
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="mb-0">{t('chatPage.channels')}</h5>
        <button
          className="btn btn-link p-0"
          onClick={() => handleModalSwitch('add')}
          style={{ background: 'none', border: 'none' }}
          type="button"
          aria-label="Add channel"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            fill="currentColor"
            className="bi bi-plus-square"
            viewBox="0 0 16 16"
          >
            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
          </svg>
          <span className="visually-hidden">+</span>
        </button>
      </div>
      <ul className="list-group mb-3">
        {channels.map((channel) => (
          <ChannelItem
            key={channel.id}
            channel={channel}
            channelId={channelId}
            handleSetChannel={handleSetChannel}
            handleModalSwitch={handleModalSwitch}
          />
        ))}
      </ul>

      <AddChannelModal
        show={showModal && modalType === 'add'}
        handleClose={() => handleModalSwitch('')}
        handleAddChannel={handleAddChannel}
        channels={channels}
      />

      <RenameChannelModal
        show={showModal && modalType === 'rename'}
        handleClose={() => handleModalSwitch('')}
        handleRenameChannel={handleRenameChannel}
        channels={channels}
        initialName={selectedChannel?.name || ''}
      />

      <RemoveChannelModal
        show={showModal && modalType === 'remove'}
        handleClose={() => handleModalSwitch('')}
        handleRemoveChannel={handleRemoveChannel}
        channels={channels}
      />
    </div>
  );
};

export default ChannelList;
