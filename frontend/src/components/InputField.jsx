import React from 'react';
import {
  ErrorMessage,
  useFormikContext,
} from 'formik';

const InputField = ({
  label,
  name,
  type,
}) => {
  const {
    handleChange,
    handleBlur,
    touched,
    errors,
  } = useFormikContext();

  return (
    <div className="mb-3">
      <input
        name={name}
        type={type}
        className={`form-control ${
          touched[name] && errors[name]
            ? 'is-invalid'
            : ''
        }`}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder={label} // Используем label как placeholder
      />
      <ErrorMessage
        component="div"
        name={name}
        className="invalid-feedback"
      />
    </div>
  );
};

export default InputField;
