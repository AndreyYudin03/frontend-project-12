import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendMessage } from "../store/slices/chatSlice";

const MessageInput = () => {
  const [text, setText] = useState("");
  const { channelId } = useSelector((state) => state.chat);
  const dispatch = useDispatch();

  const handleSend = () => {
    dispatch(sendMessage({ channelId, text }));
    setText("");
  };

  return (
    <form onSubmit={(e) => e.preventDefault()} className="d-flex">
      <input
        type="text"
        className="form-control me-2"
        placeholder="Введите сообщение..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{ flexGrow: 1 }}
      />
      <button type="button" className="btn btn-primary" onClick={handleSend}>
        Отправить
      </button>
    </form>
  );
};

export default MessageInput;
