// react
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

// toastContainer
import { ToastContainer } from 'react-toastify';

// profanityFilter
import LeoProfanity from 'leo-profanity';

// rollbar
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import rollbarConfig from './rollbar.js';

// i18n
import initializeI18n from './resources/index.js';

// store
import store from './store/index.js';

// socket
import socket from './socketClient.js';
import setupSocketHandlers from './socketHandlers.js';

// стили
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './styles/app.css';

// app
import App from './App.js';

const initializeProfanityFilter = () => {
  LeoProfanity.add(LeoProfanity.getDictionary('ru'));
  LeoProfanity.add(LeoProfanity.getDictionary('en'));
};

const initApp = () => {
  initializeProfanityFilter();
  initializeI18n();

  socket.connect();
  setupSocketHandlers(socket, store);

  const root = ReactDOM.createRoot(document.getElementById('root'));

  const renderApp = () => {
    root.render(
      <React.StrictMode>
        <RollbarProvider config={rollbarConfig}>
          <ErrorBoundary>
            <Provider store={store}>
              <BrowserRouter>
                <App />
                <ToastContainer />
              </BrowserRouter>
            </Provider>
          </ErrorBoundary>
        </RollbarProvider>
      </React.StrictMode>,
    );
  };

  window.addEventListener('beforeunload', () => {
    socket.disconnect();
  });

  return renderApp();
};

initApp();
