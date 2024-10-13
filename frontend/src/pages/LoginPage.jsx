import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LoginForm from '../components/Forms/LoginForm';

import routes from '../routes';

const LoginPage = () => {
  const { t } = useTranslation();

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">{t('loginPage.title')}</h1>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <LoginForm />
          <div className="text-center mt-3">
            <p>
              {t('loginPage.noAccount')}
              {' '}
              <Link to={routes.register}>{t('loginPage.signUp')}</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
