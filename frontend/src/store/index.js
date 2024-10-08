import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice.js';
import channelsReducer from './slices/channelsSlice.js';
import messagesReducer from './slices/messagesSlice.js';

const store = configureStore({
  reducer: {
    auth: authReducer,
    channels: channelsReducer,
    messages: messagesReducer,
  },
});

export default store;
