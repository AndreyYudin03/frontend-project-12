/* eslint-disable no-param-reassign */
/* eslint-disable no-use-before-define */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import rollbar from '../../rollbar.js';

import api from '../../api/index.js';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const getMessages = createAsyncThunk(
  'messages/getMessages',
  async (_, { dispatch, rejectWithValue }) => api
    .get('/messages', getAuthHeaders())
    .then((response) => {
      dispatch(setMessages(response.data));
      return null;
    })
    .catch((error) => {
      rollbar.error('Failed to get messages', error);
      return rejectWithValue(error.response.data);
    }),
);

export const sendMessage = createAsyncThunk(
  'messages/sendMessage',
  async ({ text, channelId }, { rejectWithValue }) => {
    const username = localStorage.getItem('username');
    const newMessage = { body: text, channelId, username };
    return api
      .post('/messages', newMessage, getAuthHeaders())
      .then(() => channelId)
      .catch((error) => {
        rollbar.error('Failed to send message', error);
        return rejectWithValue(error.response.data);
      });
  },
);

export const removeMessage = createAsyncThunk(
  'messages/removeMessage',
  async ({ messageId }, { dispatch, rejectWithValue }) => api
    .delete(`/messages/${messageId}`, getAuthHeaders())
    .then(() => {
      dispatch(deleteMessage({ id: messageId }));
      return messageId;
    })
    .catch((error) => {
      rollbar.error('Failed to delete message', error);
      return rejectWithValue(error.response.data);
    }),
);

export const removeAllMessagesByChannel = createAsyncThunk(
  'messages/removeAllMessagesByChannel',
  async ({ channelId }, { dispatch, rejectWithValue }) => api
    .get('/messages', getAuthHeaders())
    .then((response) => {
      const messagesByChannel = response.data.filter(
        (message) => message.channelId === channelId,
      );

      const deletePromises = messagesByChannel.map(({ id }) => api.delete(`/messages/${id}`, getAuthHeaders()));

      return Promise.all(deletePromises);
    })
    .then(() => {
      dispatch(deleteMessagesByChannelId({ channelId }));
      return channelId;
    })
    .catch((error) => {
      rollbar.error('Failed to delete all channel messages', error);
      return rejectWithValue(error.response.data);
    }),
);

const initialState = {
  messages: [],
  isLoading: true,
  error: null,
};

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    deleteMessage: (state, action) => {
      const { id } = action.payload;
      state.messages = state.messages.filter((message) => message.id !== id);
    },
    deleteMessagesByChannelId: (state, action) => {
      const { channelId } = action.payload;
      state.messages = state.messages.filter(
        (message) => message.channelId !== channelId,
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMessages.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getMessages.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getMessages.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const {
  setMessages,
  addMessage,
  deleteMessage,
  deleteMessagesByChannelId,
} = messagesSlice.actions;

export default messagesSlice.reducer;
