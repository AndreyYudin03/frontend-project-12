import React from 'react';
import {
  ErrorMessage,
  useFormikContext,
} from 'formik';

const InputField = ({ label, name, type }) => {
  const {
    handleChange,
    handleBlur,
    touched,
    errors,
  } = useFormikContext();

  return (
    <div className="input-field-wrapper">
      <div className="input-field-container">
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
          placeholder={label} // Используем текст метки как placeholder
        />
        {/* Удаляем label, так как он теперь не нужен */}
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
