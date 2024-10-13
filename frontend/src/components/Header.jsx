import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { logout } from '../store/slices/authSlice';

// selectors
import { getToken } from '../store/slices/authSelectors.js';

import routes from '../routes';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const token = useSelector(getToken);

  const handleLogout = () => {
    dispatch(logout());
    navigate(routes.login);
  };

  const isChatPage = location.pathname === '/';

  return (
    <header className="bg-primary text-white p-1">
      <div className="container d-flex justify-content-between align-items-center">
        <Link to="/" className="text-white text-decoration-none">
          <h1>{t('header.title')}</h1>
        </Link>
        {token && isChatPage && (
          <button
            className="btn btn-primary"
            onClick={handleLogout}
            type="button"
          >
            {t('header.logout')}
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
