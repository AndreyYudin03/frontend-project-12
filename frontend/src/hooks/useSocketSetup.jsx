import { useEffect } from "react";
import socket from "../socket";

const useSetupSocket = () => {
  useEffect(() => {
    socket.connect();
    return () => {
      console.log("SOCKET DISCONECTED");
      socket.disconnect();
    };
  }, []);
};

export default useSetupSocket;
