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
  socket.join('test room');
  socket.on('new message', data => {
    io.to('test room').emit('receive message', data);
  });
});

var PORT = process.env.PORT || 3001;
server.listen(PORT, '0.0.0.0', function(err) {
  if (err) return console.error(err);
  console.log('Listening on port', PORT);
});
