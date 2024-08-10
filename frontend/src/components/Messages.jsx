import React, { useEffect } from "react";
import socket from "../socket.js";
import { addMessage } from "../store/slices/chatSlice";
import { useDispatch, useSelector } from "react-redux";

const Messages = ({ messages }) => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token)
      socket.on("newMessage", (payload) => {
        console.log("new message: ", payload);

        dispatch(addMessage(payload));
      });

    return () => {
      socket.off("newMessage");
      console.log("Message socket disconnected");
    };
  }, [dispatch, token]);

  if (!messages || messages.length === 0) {
    return <div>No messages available</div>;
  }

  return (
    <ul className="list-group overflow-auto" style={{ maxHeight: "100%" }}>
      {messages.map((message) => (
        <li
          key={message.id}
          className="list-group-item"
          style={{
            wordBreak: "break-word",
            whiteSpace: "pre-wrap",
          }}
        >
          <strong>{message.username}:</strong> {message.body}
        </li>
      ))}
    </ul>
  );
};

export default Messages;
