import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentChannel } from "../store/slices/chatSlice.js";

const Channels = ({ channels }) => {
  // const { currentChannelId } = useSelector((state) => state.chat);

  // useEffect(() => {
  //   console.log(currentChannelId);
  // });

  const dispatch = useDispatch();

  if (!channels || channels.length === 0) {
    return <div>No channels available</div>;
  }

  const handleSetChannel = () => {
    // dispatch(setCurrentChannel(channel));
  };

  return (
    <ul className="list-group">
      {channels.map((channel) => (
        <li key={channel.id} className="list-group-item">
          {channel.name}
        </li>
      ))}
    </ul>
  );
};

export default Channels;
