/* eslint-disable functional/no-try-statement */
/* eslint-disable no-param-reassign */
/* eslint-disable no-use-before-define */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import cleanText from './profanityFilter.js';

import { removeAllMessagesByChannel } from './messagesSlice.js';

import rollbar from '../../rollbar.js';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const getChannels = createAsyncThunk(
  'channels/getChannels',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.get('/api/v1/channels', getAuthHeaders());
      dispatch(setChannels(response.data));
      dispatch(setChannelId(response.data[0].id));
      return response.data;
    } catch (error) {
      rollbar.error('Failed to get channels', error);
      return rejectWithValue(error.response.data);
    }
  },
);

export const newChannel = createAsyncThunk(
  'channels/newChannel',
  async ({ name }, { dispatch, rejectWithValue }) => {
    try {
      const filteredName = cleanText(name);
      const channel = { name: filteredName };
      const response = await axios.post(
        '/api/v1/channels',
        channel,
        getAuthHeaders(),
      );
      dispatch(setChannelId(response.data.id));
      return name;
    } catch (error) {
      rollbar.error('Failed creating a new channel', error);
      return rejectWithValue(error.response.data);
    }
  },
);

export const renameChannel = createAsyncThunk(
  'channels/renameChannel',
  async ({ channelId, name }, { dispatch, rejectWithValue }) => {
    try {
      const filteredName = cleanText(name);
      const channel = { name: filteredName };
      const response = await axios.patch(
        `/api/v1/channels/${channelId}`,
        channel,
        getAuthHeaders(),
      );
      dispatch(editChannel(response.data));
      return channelId;
    } catch (error) {
      rollbar.error('Failed to rename the channel', error);
      return rejectWithValue(error.response.data);
    }
  },
);

export const removeChannel = createAsyncThunk(
  'channels/removeChannel',
  async ({ channelId }, { dispatch, rejectWithValue }) => {
    try {
      await axios.delete(`/api/v1/channels/${channelId}`, getAuthHeaders());

      await dispatch(removeAllMessagesByChannel({ channelId }));
      return { channelId };
    } catch (error) {
      rollbar.error('Failed to delete the channel', error);
      return rejectWithValue(error.response.data);
    }
  },
);

const initialState = {
  channels: [],
  channelId: null,
  isLoading: true,
  error: null,
};

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    setChannels: (state, action) => {
      state.channels = action.payload;
    },
    addChannel: (state, action) => {
      state.channels.push(action.payload);
    },
    setChannelId: (state, action) => {
      state.channelId = action.payload;
    },
    editChannel: (state, action) => {
      const { id, name } = action.payload;
      const index = state.channels.findIndex((channel) => channel.id === id);
      state.channels[index].name = name;
    },
    deleteChannel: (state, action) => {
      const { id } = action.payload;
      if (state.channelId === id) {
        state.channelId = state.channels[0].id;
      }
      const newChannels = state.channels.filter((channel) => channel.id !== id);
      state.channels = newChannels;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getChannels.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getChannels.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getChannels.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const {
  setChannels,
  addChannel,
  setChannelId,
  editChannel,
  deleteChannel,
} = channelsSlice.actions;

export default channelsSlice.reducer;
