import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      console.log("Токен хранилища ", storedToken);
    }
    setIsLoading(false);
  }, []);

  const login = async (credentials) => {
    try {
      const response = await axios.post("/api/v1/login", credentials);
      const token = response.data.token;
      localStorage.setItem("token", token);
      setToken(token);
      console.log("Токен получен и присвоен ", token);
    } catch (error) {
      console.error("Login error: ", error);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    const tokenCheck = localStorage.getItem("token");
    console.log("Проверка удаления токена из хранилища ", tokenCheck);
  };

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider
      value={{ token, login, logout, isAuthenticated, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
