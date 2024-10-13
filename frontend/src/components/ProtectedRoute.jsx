import { Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { loadCredentialsFromStorage } from '../store/slices/authSlice.js';

// selectors
import {
  getToken,
  getUsername,
  getAuthLoading,
} from '../store/slices/authSelectors.js';

import routes from '../routes';

const ProtectedRoute = ({ element: Page }) => {
  const dispatch = useDispatch();
  const token = useSelector(getToken);
  const username = useSelector(getUsername);
  const isLoading = useSelector(getAuthLoading);

  useEffect(() => {
    if (!token || !username) {
      dispatch(loadCredentialsFromStorage());
    }
  }, [dispatch, token, username]);

  if (isLoading) {
    return (
      <div className="spinner-border" role="status">
        <span className="sr-only" />
      </div>
    );
  }

  return token && username ? <Page /> : <Navigate to={routes.login} />;
};

export default ProtectedRoute;
