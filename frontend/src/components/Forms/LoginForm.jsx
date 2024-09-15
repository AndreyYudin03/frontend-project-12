import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { login } from '../../store/slices/authSlice.js';
import AuthForm from './AuthForm.jsx';
import InputField from '../InputField.jsx';

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { error } = useSelector((state) => state.auth);

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

  return (
    <AuthForm
      initialValues={{ username: '', password: '' }}
      onSubmit={handleSubmit}
      submitText={t('loginPage.submit')}
      error={error && t('loginPage.error.default')}
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
