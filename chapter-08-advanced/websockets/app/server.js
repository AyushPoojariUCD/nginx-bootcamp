const WebSocket = require('ws');
const server = new WebSocket.Server({ port: 3000 });

server.on('connection', socket => {
  console.log('New client connected');
  socket.send('Hello from WebSocket server 🚀');

  socket.on('message', msg => {
    console.log(`Received: ${msg}`);
    socket.send(`Echo: ${msg}`);
  });
});
