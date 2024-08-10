import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// import { closeSocketConnection } from "../../socket";

export const login = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/v1/login", credentials);
      const { token, username } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("username", username);
      return token;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const loadTokenFromStorage = createAsyncThunk(
  "auth/loadTokenFromStorage",
  async (_, { rejectWithValue, dispatch }) => {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");
    if (!token) {
      dispatch(setCredentials({ token: null, username: null }));
      return rejectWithValue("No token found");
    } else {
      dispatch(setCredentials({ token, username }));
    }
    return token;
  }
);

const initialState = {
  isLoading: true,
  token: null,
  username: null,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      state.token = null;
      state.username = null;
    },
    setCredentials: (state, action) => {
      const { token, username } = action.payload;
      state.token = token;
      state.username = username;
    },
    isAuthenticated: (state) => {
      const { token } = state;
      return !!token;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(loadTokenFromStorage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = false;
      })
      .addCase(loadTokenFromStorage.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, setCredentials, isAuthenticated } = authSlice.actions;
export default authSlice.reducer;
