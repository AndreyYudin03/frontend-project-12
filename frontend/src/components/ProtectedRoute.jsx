import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { loadTokenFromStorage } from "../store/slices/authSlice.js";

const ProtectedRoute = ({ element: Page }) => {
  const dispatch = useDispatch();
  const { token, isLoading } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!token) {
      dispatch(loadTokenFromStorage());
    }
  }, [dispatch, token]);

  console.log("isLoading:", isLoading);
  console.log("token:", token);

  if (isLoading) {
    return <div>Loading... ProtectedRoute</div>;
  }

  return token ? <Page /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
