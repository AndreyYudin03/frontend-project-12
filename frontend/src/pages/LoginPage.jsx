import React from "react";
import LoginForm from "../components/LoginForm";

const LoginPage = () => {
  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Login</h1>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
