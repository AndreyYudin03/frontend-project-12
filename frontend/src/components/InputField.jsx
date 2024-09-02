import React from 'react';
import { ErrorMessage, useFormikContext } from 'formik';

const InputField = ({ label, name, type }) => {
  const {
    handleChange, handleBlur, touched, errors,
  } = useFormikContext();

  return (
    <div className="mb-3">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <input
        name={name}
        type={type}
        className={`form-control ${
          touched[name] && errors[name] ? 'is-invalid' : ''
        }`}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <ErrorMessage component="div" name={name} className="invalid-feedback" />
    </div>
  );
};

export default InputField;
