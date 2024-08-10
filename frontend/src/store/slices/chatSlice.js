import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// load channels and messages
export const getChatData = createAsyncThunk(
  "chat/getChatData",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const [channelsResponse, messagesResponse] = await Promise.all([
        axios.get("/api/v1/channels", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get("/api/v1/messages", {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);
      return {
        channels: channelsResponse.data,
        messages: messagesResponse.data,
      };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const sendMessage = createAsyncThunk(
  "chat/sendMessage",
  async ({ channelId, text }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const username = localStorage.getItem("username");
      const newMessage = { body: text, channelId, username };
      await axios
        .post("/api/v1/messages", newMessage, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => console.log(response.data));
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  channels: [],
  messages: [],
  channelId: null,
  isLoading: true,
  error: null,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setChannels: (state, action) => {
      state.channels = action.payload;
    },
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
    setCurrentChannelId: (state, action) => {
      state.channelId = action.payload;
    },
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getChatData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getChatData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.channels = action.payload.channels;
        state.messages = action.payload.messages;
        state.channelId = action.payload.channels[0]?.id || null;
        state.error = null;
      })
      .addCase(getChatData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { setChannels, setMessage, addMessage } = chatSlice.actions;
export default chatSlice.reducer;
