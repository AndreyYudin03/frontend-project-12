/* eslint-disable functional/no-try-statement */
/* eslint-disable no-param-reassign */
/* eslint-disable no-use-before-define */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import cleanText from './profanityFilter.js';
import rollbar from '../../rollbar.js';

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
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.get('/api/v1/messages', getAuthHeaders());
      dispatch(setMessages(response.data));
      return null;
    } catch (error) {
      rollbar.error('Failed to get messages', error);
      return rejectWithValue(error.response.data);
    }
  },
);

export const sendMessage = createAsyncThunk(
  'messages/sendMessage',
  async ({ text, channelId }, { rejectWithValue }) => {
    try {
      const username = localStorage.getItem('username');
      const filteredMessage = cleanText(text);
      const newMessage = { body: filteredMessage, channelId, username };
      await axios.post('/api/v1/messages', newMessage, getAuthHeaders());
      return channelId;
    } catch (error) {
      rollbar.error('Failed to send message', error);
      return rejectWithValue(error.response.data);
    }
  },
);

export const removeMessage = createAsyncThunk(
  'messages/removeMessage',
  async ({ messageId }, { dispatch, rejectWithValue }) => {
    try {
      await axios.delete(`/api/v1/messages/${messageId}`, getAuthHeaders());
      dispatch(deleteMessage({ id: messageId }));
      return messageId;
    } catch (error) {
      rollbar.error('Failed to delete message', error);
      return rejectWithValue(error.response.data);
    }
  },
);

export const removeAllMessagesByChannel = createAsyncThunk(
  'messages/removeAllMessagesByChannel',
  async ({ channelId }, { dispatch, rejectWithValue }) => {
    try {
      const messages = await axios.get('/api/v1/messages', getAuthHeaders());

      const messagesByChannel = messages.data.filter(
        (message) => message.channelId === channelId,
      );

      const deletePromises = messagesByChannel.map(({ id }) => axios.delete(`/api/v1/messages/${id}`, getAuthHeaders()));

      await Promise.all(deletePromises);

      dispatch(deleteMessagesByChannelId({ channelId }));
      return channelId;
    } catch (error) {
      rollbar.error('Failed to delete all channel messages', error);
      return rejectWithValue(error.response.data);
    }
  },
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
