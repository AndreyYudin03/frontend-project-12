import React from 'react';
import { Field, ErrorMessage } from 'formik';
import { useTranslation } from 'react-i18next';
import ModalForm from '../../ModalView.jsx';

import { renameChannelValidationSchema } from '../../../validations/index.js';

const RenameChannelModal = ({
  show,
  handleClose,
  handleRenameChannel,
  initialName,
  channels,
}) => {
  const { t } = useTranslation();

  return (
    <ModalForm
      show={show}
      handleClose={handleClose}
      title={t('chatPage.modal.renameChannel.title')}
      initialValues={{ newChannelName: initialName }}
      validationSchema={renameChannelValidationSchema(t, channels, initialName)}
      onSubmit={handleRenameChannel}
      submitButtonText={t('chatPage.modal.renameChannel.submit')}
    >
      <div className="mb-3">
        <label className="visually-hidden" htmlFor="renameChannel">
          {t('chatPage.modal.renameChannel.label')}
        </label>
        <Field
          type="text"
          id="newChannelName"
          name="newChannelName"
          className="form-control"
          placeholder={t('chatPage.modal.renameChannel.placeholder')}
        />
        <ErrorMessage
          name="newChannelName"
          component="div"
          className="text-danger"
        />
      </div>
    </ModalForm>
  );
};

export default RenameChannelModal;
