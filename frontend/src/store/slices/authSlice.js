/* eslint-disable no-param-reassign */
/* eslint-disable no-use-before-define */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import rollbar from '../../rollbar.js';

import api from '../../api/index.js';

const handleAuthSuccess = (token, username, dispatch) => {
  localStorage.setItem('token', token);
  localStorage.setItem('username', username);
  dispatch(setCredentials({ token, username }));
};

export const login = createAsyncThunk(
  'auth/login',
  async (credentials, { dispatch, rejectWithValue }) => api
    .post('/login', credentials)
    .then((response) => {
      const { token, username } = response.data;
      handleAuthSuccess(token, username, dispatch);
      return token;
    })
    .catch((error) => rejectWithValue(error.response?.data?.statusCode || 'Login failed')),
);

export const signup = createAsyncThunk(
  'auth/signup',
  async (credentials, { dispatch, rejectWithValue }) => api
    .post('/signup', credentials)
    .then((response) => {
      const { token, username } = response.data;
      handleAuthSuccess(token, username, dispatch);
      return token;
    })
    .catch((error) => {
      if (error.response && error.response.status === 409) {
        return rejectWithValue('UsernameAlreadyExists');
      }
      rollbar.error('User registration failed', error);
      return rejectWithValue(error.response?.data || 'Registration failed');
    }),
);

export const loadCredentialsFromStorage = createAsyncThunk(
  'auth/loadCredentialsFromStorage',
  async (_, { dispatch }) => {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    if (token && username) {
      handleAuthSuccess(token, username, dispatch);
      return token;
    }
    return null;
  },
);

const initialState = {
  isLoading: true,
  token: null,
  username: null,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      state.token = null;
      state.username = null;
    },
    setCredentials: (state, action) => {
      const { token, username } = action.payload;
      state.token = token;
      state.username = username;
    },
  },
  extraReducers: (builder) => {
    const handlePending = (state) => {
      state.isLoading = true;
      state.error = null;
    };

    const handleFulfilled = (state) => {
      state.isLoading = false;
      state.error = null;
    };

    const handleRejected = (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    };

    builder
      .addCase(login.pending, handlePending)
      .addCase(signup.pending, handlePending)
      .addCase(loadCredentialsFromStorage.pending, handlePending)

      .addCase(login.fulfilled, handleFulfilled)
      .addCase(signup.fulfilled, handleFulfilled)
      .addCase(loadCredentialsFromStorage.fulfilled, handleFulfilled)

      .addCase(login.rejected, handleRejected)
      .addCase(signup.rejected, handleRejected)
      .addCase(loadCredentialsFromStorage.rejected, handleRejected);
  },
});

export const { logout, setCredentials } = authSlice.actions;
export default authSlice.reducer;
