import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { signup } from '../../store/slices/authSlice.js';
import AuthForm from './AuthForm.jsx';
import InputField from '../InputField.jsx';
import { signUpValidationSchema } from '../../validations/index.js';

const SignUpForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.auth);
  const { t } = useTranslation();

  const handleSubmit = ({ username, password }, { setSubmitting }) => {
    dispatch(signup({ username, password }))
      .then((result) => {
        if (signup.fulfilled.match(result)) {
          console.log('Signup succeeded, navigating...');
          navigate('/');
        } else {
          console.error('Signup failed:', result.payload);
        }
      })
      .catch((err) => {
        console.error('Unexpected error during signup:', err);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <AuthForm
      initialValues={{ username: '', password: '', confirmPassword: '' }}
      validationSchema={signUpValidationSchema(t)}
      onSubmit={handleSubmit}
      submitText={t('signUpPage.submit')}
    >
      <InputField
        label={t('signUpPage.username')}
        name="username"
        type="text"
      />
      <InputField
        label={t('signUpPage.password')}
        name="password"
        type="password"
      />
      <InputField
        label={t('signUpPage.repeatPassword')}
        name="confirmPassword"
        type="password"
      />
      {error && (
        <div className="text-danger text-center mt-3">
          {t('signUpPage.validation.userAlreadyExist')}
        </div>
      )}
    </AuthForm>
  );
};

export default SignUpForm;
