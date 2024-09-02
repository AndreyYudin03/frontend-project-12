import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Formik, Form } from 'formik';
import { useTranslation } from 'react-i18next';

const ModalForm = ({
  show,
  handleClose,
  title,
  initialValues,
  validationSchema,
  onSubmit,
  children,
  submitButtonText = 'Submit',
}) => {
  const { t } = useTranslation();

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      {initialValues ? (
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <Modal.Body>{children}</Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  {t('chatPage.modal.cancel')}
                </Button>
                <Button variant="primary" type="submit" disabled={isSubmitting}>
                  {submitButtonText}
                </Button>
              </Modal.Footer>
            </Form>
          )}
        </Formik>
      ) : (
        <>
          <Modal.Body>{children}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              {t('chatPage.modal.cancel')}
            </Button>
            <Button variant="danger" onClick={onSubmit}>
              {submitButtonText}
            </Button>
          </Modal.Footer>
        </>
      )}
    </Modal>
  );
};

export default ModalForm;
