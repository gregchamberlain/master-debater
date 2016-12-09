import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import path from 'path';
import socketio from 'socket.io';

const app = express();
const server = http.Server(app);
const io = socketio(server);

if (process.env.NODE_ENV === 'production') {
  app.use('/static', express.static('dist/client'));
  app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '../../index.html'));
  });
} else {
  const cors = require('cors');
  app.use(cors());
}

app.get('/test', (req, res) => {
  res.send('hello');
});

io.on('connection', socket => {
  console.log('someone connected');
  socket.on('disconnect', () => console.log('someone disconnected'));
  socket.on('join room', name => {
    socket.join(name);
  });

  socket.on('leave room', name => {
    socket.leave(name);
  });

  socket.on('change room', (room1, room2) => {
    socket.leave(room1);
    socket.join(room2);
  });

  socket.join('test');
  socket.on('send message', (message, room) => {
    io.to(room).emit(`receive message`, message);
  });
});

var PORT = process.env.PORT || 3001;
server.listen(PORT, '0.0.0.0', function(err) {
  if (err) return console.error(err);
  console.log('Listening on port', PORT);
});
