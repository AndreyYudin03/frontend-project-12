import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Provider, ErrorBoundary } from '@rollbar/react';

import { ToastContainer } from 'react-toastify';
import LoginPage from './pages/LoginPage.jsx';
import SignUpPage from './pages/SignUpPage.jsx';
import ChatPage from './pages/ChatPage.jsx';
import NotFound from './pages/NotFoundPage.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import Header from './components/Header.jsx';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import './styles/app.css';

const rollbarConfig = {
  accessToken: '1510989d7a1b46a0b7427ef53e6be816',
  environment: 'testenv',
};

const App = () => (
  <Provider config={rollbarConfig}>
    <ErrorBoundary>
      <ToastContainer />
      <div className="d-flex flex-column vh-100">
        <Header />
        <main className="flex-grow-1 hv-100">
          <Routes>
            <Route path="/" element={<ProtectedRoute element={ChatPage} />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </ErrorBoundary>
  </Provider>
);

export default App;
