import { useEffect } from 'react';
import socket from '../socketClient';

const useSetupSocket = () => {
  useEffect(() => {
    socket.connect();
    return () => {
      socket.disconnect();
    };
  }, []);
};

export default useSetupSocket;
