import React from 'react';
import { useTranslation } from 'react-i18next';
import SignUpForm from '../components/Forms/SignUpForm';

const SignUpPage = () => {
  const { t } = useTranslation();

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">{t('signUpPage.title')}</h1>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <SignUpForm />
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
