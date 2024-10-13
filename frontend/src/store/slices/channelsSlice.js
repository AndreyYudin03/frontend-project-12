/* eslint-disable no-param-reassign */
/* eslint-disable no-use-before-define */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { removeAllMessagesByChannel } from './messagesSlice.js';
import rollbar from '../../rollbar.js';

import api from '../../api';

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
  async (_, { dispatch, rejectWithValue }) => api
    .get('/channels', getAuthHeaders())
    .then((response) => {
      dispatch(setChannels(response.data));
      dispatch(setChannelId(response.data[0].id));
      return response.data;
    })
    .catch((error) => {
      rollbar.error('Failed to get channels', error);
      return rejectWithValue(error.response.data);
    }),
);

export const newChannel = createAsyncThunk(
  'channels/newChannel',
  async ({ name }, { dispatch, rejectWithValue }) => {
    const channel = { name };
    return api
      .post('/channels', channel, getAuthHeaders())
      .then((response) => {
        dispatch(setChannelId(response.data.id));
        return name;
      })
      .catch((error) => {
        rollbar.error('Failed creating a new channel', error);
        return rejectWithValue(error.response.data);
      });
  },
);

export const renameChannel = createAsyncThunk(
  'channels/renameChannel',
  async ({ channelId, name }, { dispatch, rejectWithValue }) => {
    const editedChannel = { name };
    return api
      .patch(`/channels/${channelId}`, editedChannel, getAuthHeaders())
      .then((response) => {
        dispatch(editChannel(response.data));
        console.log('response.data(renameChannel): ', response.data);
      })
      .catch((error) => {
        rollbar.error('Failed to rename the channel', error);
        return rejectWithValue(error.response.data);
      });
  },
);

export const removeChannel = createAsyncThunk(
  'channels/removeChannel',
  async ({ channelId }, { dispatch, rejectWithValue }) => api
    .delete(`/channels/${channelId}`, getAuthHeaders())
    .then(() => dispatch(removeAllMessagesByChannel({ channelId })))
    .then(() => ({ channelId }))
    .catch((error) => {
      rollbar.error('Failed to delete the channel', error);
      return rejectWithValue(error.response.data);
    }),
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
      console.log('action.payload(editChannel): ', action.payload);
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
