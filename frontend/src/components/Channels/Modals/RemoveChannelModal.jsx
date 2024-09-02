import React from 'react';
import { useTranslation } from 'react-i18next';
import ModalForm from '../../ModalView.jsx'; // Импортируем общий компонент

const RemoveChannelModal = ({ show, handleClose, handleRemoveChannel }) => {
  const { t } = useTranslation();

  return (
    <ModalForm
      show={show}
      handleClose={handleClose}
      title={t('chatPage.modal.removeChannel.title')}
      onSubmit={handleRemoveChannel}
      submitButtonText={t('chatPage.modal.removeChannel.submit')}
    >
      <div>{t('chatPage.modal.removeChannel.question')}</div>
    </ModalForm>
  );
};

export default RemoveChannelModal;
