// react
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

// rollbar
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import rollbar from './rollbar.js';

// store
import store from './store/index.js';

// i18n
import './resources/index.js';

// app
import App from './App.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RollbarProvider instance={rollbar}>
      <ErrorBoundary>
        <Provider store={store}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </Provider>
      </ErrorBoundary>
    </RollbarProvider>
  </React.StrictMode>,
);
