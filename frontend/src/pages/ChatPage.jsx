import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getChatData } from "../store/slices/chatSlice.js";
import Channels from "../components/Channels";
import Messages from "../components/Messages";
import MessageInput from "../components/MessageInput";
import { logout } from "../store/slices/authSlice.js";
import { useNavigate } from "react-router-dom";
import useSetupSocket from "../hooks/useSocketSetup.jsx";

const ChatPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { channels, messages, isLoading, error } = useSelector(
    (state) => state.chat
  );

  useSetupSocket();

  useEffect(() => {
    dispatch(getChatData());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  if (isLoading) {
    return (
      <div className="spinner-border" role="status">
        <span className="sr-only"></span>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container vh-100 d-flex flex-column justify-content-center align-items-center">
      <div className="row w-75 h-75">
        <header className="col-12 bg-light p-2 d-flex justify-content-end">
          <button className="btn btn-outline-danger" onClick={handleLogout}>
            Logout
          </button>
        </header>
        <div className="col-12 p-0 d-flex h-100">
          <div className="col-3 bg-light p-2" style={{ overflowY: "auto" }}>
            <Channels channels={channels} />
          </div>
          <main className="col-9 d-flex flex-column p-2">
            <div
              className="flex-grow-1 overflow-auto"
              style={{ maxHeight: "100%", overflowY: "auto" }}
            >
              <Messages messages={messages} />
            </div>
            <div className="mt-3">
              <MessageInput />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
