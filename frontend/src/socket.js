import { io } from 'socket.io-client';

// const port = process.env.SOCKET_PORT || 5001;
const socket = io();

export default socket;
