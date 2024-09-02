import { useEffect } from 'react';
import socket from '../socket';

const useSetupSocket = () => {
  useEffect(() => {
    socket.connect();
    return () => {
      socket.disconnect();
    };
  }, []);
};

export default useSetupSocket;
