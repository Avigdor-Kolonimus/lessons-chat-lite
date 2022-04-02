const express = require('express');
const cors = require('cors');

const port = 35000;

const app = express();
const httpServer = require('http').Server(app);
const io = require('socket.io')(httpServer,{
  cors: {
    origin: "*",
  }
});

app.use(cors());
app.use(express.json());

const rooms = new Map();

app.get('/rooms/:id', (req, res) => {
  const { id: roomID } = req.params;
  const obj = rooms.has(roomID)
    ? {
        users: [...rooms.get(roomID).get('users').values()],
        messages: [...rooms.get(roomID).get('messages').values()],
      }
    : { users: [], messages: [] };
  res.status(200).json(obj);
});

app.post('/rooms', function(req, res){
  const { roomID, } = req.body;
  if (!rooms.has(roomID)) {
    rooms.set(
      roomID,
      new Map([
        ['users', new Map()],
        ['messages', []],
      ]),
    );
    return res.status(201).send();
  }
  res.status(200).send();
});
io.on('connection', (socket) => {
  socket.on('ROOM:JOIN', ({ roomID, userName }) => {
    socket.join(roomID);
    rooms.get(roomID).get('users').set(socket.id, userName);
    const users = [...rooms.get(roomID).get('users').values()];
    socket.broadcast.to(roomID).emit('ROOM:SET_USERS', users);
  });

  socket.on('ROOM:NEW_MESSAGE', ({ roomID, userName, text }) => {
    const obj = {
      userName,
      text,
    };
    rooms.get(roomID).get('messages').push(obj);
    socket.broadcast.to(roomID).emit('ROOM:NEW_MESSAGE', obj);
  });

  socket.on('disconnect', () => {
    console.log(`disconnect ${socket.id}`);
    rooms.forEach((value, roomID) => {
      if (value.get('users').delete(socket.id)) {
        const users = [...value.get('users').values()];
        socket.broadcast.to(roomID).emit('ROOM:SET_USERS', users);
      }
    });
  });

  console.log(`user ${socket.id} connected`);
});

httpServer.listen(port, (err)=>{
    if (err){
        throw Error(err);
    }

    console.log('Server up!');
});