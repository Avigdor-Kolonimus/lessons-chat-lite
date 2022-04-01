import io from 'socket.io-client';

const socket = io();

// socket.on('connect', () => {
//   console.log(`event: connect | session id: ${socket.id}`);
// });

// socket.on('connect_error', err => {
//   console.log(`event: connect_error | reason: ${err.message}`);
// });

// socket.on('disconnect', reason => {
//   console.log('Disconnected', reason);
// });

// socket.onAny((event, ...args) => {
//   console.log(`event: ${event} | arguments: ${args}`);
// });

export default socket;