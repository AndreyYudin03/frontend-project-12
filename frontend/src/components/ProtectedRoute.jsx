import { Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { loadCredentialsFromStorage } from '../store/slices/authSlice.js';

const ProtectedRoute = ({ element: Page }) => {
  const dispatch = useDispatch();
  const { token, username, isLoading } = useSelector((state) => state.auth);

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

  return token && username ? <Page /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
