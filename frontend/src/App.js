// react
import React from 'react';
import { Routes, Route } from 'react-router-dom';

// pages
import LoginPage from './pages/LoginPage.jsx';
import SignUpPage from './pages/SignUpPage.jsx';
import ChatPage from './pages/ChatPage.jsx';
import NotFound from './pages/NotFoundPage.jsx';

// components
import ProtectedRoute from './components/ProtectedRoute.jsx';
import Header from './components/Header.jsx';

// routes
import routes from './routes';

const App = () => (
  <div className="d-flex flex-column vh-100">
    <Header />
    <main className="flex-grow-1 hv-100">
      <Routes>
        <Route
          path={routes.main}
          element={<ProtectedRoute element={ChatPage} />}
        />
        <Route path={routes.login} element={<LoginPage />} />
        <Route path={routes.register} element={<SignUpPage />} />
        <Route path={routes.notFound} element={<NotFound />} />
      </Routes>
    </main>
  </div>
);

export default App;
