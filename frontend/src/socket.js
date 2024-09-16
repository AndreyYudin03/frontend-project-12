import { io } from 'socket.io-client';

const port = process.env.SOCKET_PORT || 5001;
const socket = io(`wss://localhost:${port}`, {
  autoConnect: false,
  transports: ['websocket'],
});

export default socket;
