import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import LoginPage from "./login/LoginPage";
import ChatPage from "./chat/ChatPage";
import NotFound from "./notFound/NotFoundPage";
import { setCredentials } from "../slices/authSlice";
import ProtectedRoute from "./ProtectedRoute";

const Main = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log(`Есть ли токен: ${token}`);
    if (token) {
      dispatch(setCredentials({ token }));
    }
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<ProtectedRoute element={ChatPage} />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Main;
