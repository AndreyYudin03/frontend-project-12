import React from 'react';
import { ErrorMessage, useFormikContext } from 'formik';

const InputField = ({ label, name, type }) => {
  const {
    handleChange, handleBlur, touched, errors,
  } = useFormikContext();

  return (
    <div className="input-field-wrapper">
      <div className="input-field-container">
        <input
          id={name}
          name={name}
          type={type}
          className={`form-control ${
            touched[name] && errors[name] ? 'is-invalid' : ''
          }`}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <label
          htmlFor={name}
          className={`input-label ${
            touched[name] || handleChange ? 'shrunk' : ''
          }`}
        >
          {label}
        </label>
        <ErrorMessage
          component="div"
          name={name}
          className="invalid-feedback"
        />
      </div>
    </div>
  );
};

export default InputField;
