import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { signup } from '../../store/slices/authSlice.js';
import AuthForm from './AuthForm.jsx';
import InputField from '../InputField.jsx';
import { signUpValidationSchema } from '../../validations/index.js';

// selectors
import { getAuthError } from '../../store/slices/authSelectors.js';

const SignUpForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const error = useSelector(getAuthError);
  const { t } = useTranslation();

  const handleSubmit = ({ username, password }, { setSubmitting }) => {
    dispatch(signup({ username, password }))
      .then((result) => {
        if (signup.fulfilled.match(result)) {
          navigate('/');
        }
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  const handleSignUpError = (authError) => {
    if (authError === 'UsernameAlreadyExists') {
      return t('signUpPage.validation.userAlreadyExist');
    }
    return null;
  };

  return (
    <AuthForm
      initialValues={{ username: '', password: '', confirmPassword: '' }}
      validationSchema={signUpValidationSchema(t)}
      onSubmit={handleSubmit}
      submitText={t('signUpPage.submit')}
      error={handleSignUpError(error)}
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
    </AuthForm>
  );
};

export default SignUpForm;
