import React from 'react';
import { Field, ErrorMessage } from 'formik';

import { useTranslation } from 'react-i18next';
import ModalForm from '../../ModalView.jsx';

import { addChannelValidationSchema } from '../../../validations';

const AddChannelModal = ({
  show, handleClose, handleAddChannel, channels,
}) => {
  const { t } = useTranslation();

  return (
    <ModalForm
      show={show}
      handleClose={handleClose}
      title={t('chatPage.modal.addChannel.title')}
      initialValues={{ channelName: '' }}
      validationSchema={addChannelValidationSchema(t, channels)}
      onSubmit={handleAddChannel}
      submitButtonText={t('chatPage.modal.addChannel.submit')}
    >
      <div className="mb-3">
        <Field
          type="text"
          name="channelName"
          className="form-control"
          placeholder={t('chatPage.modal.addChannel.placeholder')}
        />
        <ErrorMessage
          name="channelName"
          component="div"
          className="text-danger"
        />
      </div>
    </ModalForm>
  );
};

export default AddChannelModal;
