// src/features/auth/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.post("/api/v1/login", credentials);
      const { username, token } = response.data;

      localStorage.setItem("token", token);

      // После успешного запроса обновляем хранилище
      dispatch(authSlice.actions.setCredentials({ username, token }));

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    username: null,
    token: null,
    error: null,
    loading: false,
  },
  reducers: {
    setCredentials: (state, action) => {
      const { username, token } = action.payload;
      state.username = username;
      state.token = token;
    },
    logOut: (state) => {
      state.username = null;
      state.token = null;
      state.error = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.username = action.payload.username;
        console.log(action.payload); // проверка токена
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setCredentials, logOut } = authSlice.actions;
export default authSlice.reducer;
