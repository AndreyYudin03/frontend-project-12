import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { login } from '../../store/slices/authSlice.js';
import AuthForm from './AuthForm.jsx';
import InputField from '../InputField.jsx';

// selectors
import { getAuthError } from '../../store/slices/authSelectors.js';

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const error = useSelector(getAuthError);

  const handleSubmit = (values, { setSubmitting }) => {
    dispatch(login(values))
      .unwrap()
      .then(() => {
        navigate('/');
      })
      .catch(() => {
        setSubmitting(false);
      });
  };

  const handleLoginError = (authError) => {
    if (authError) {
      if (authError === 401) {
        return t('loginPage.error.401');
      }
      return t('loginPage.error.default');
    }
    return null;
  };

  return (
    <AuthForm
      initialValues={{ username: '', password: '' }}
      onSubmit={handleSubmit}
      submitText={t('loginPage.submit')}
      error={handleLoginError(error)}
    >
      <InputField label={t('loginPage.username')} name="username" type="text" />
      <InputField
        label={t('loginPage.password')}
        name="password"
        type="password"
      />
    </AuthForm>
  );
};

export default LoginForm;
