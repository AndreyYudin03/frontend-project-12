import React from 'react';
import { Formik, Form } from 'formik';

const AuthForm = ({
  initialValues,
  validationSchema,
  onSubmit,
  submitText,
  children,
  error,
}) => (
  <Formik
    initialValues={initialValues}
    validationSchema={validationSchema || null}
    onSubmit={onSubmit}
  >
    {() => (
      <Form>
        {children}
        {error && <div className="text-danger text-center mt-3">{error}</div>}
        <div className="text-center">
          <button type="submit" className="btn btn-primary">
            {submitText}
          </button>
        </div>
      </Form>
    )}
  </Formik>
);

export default AuthForm;
