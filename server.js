const express = require('express');
const cors = require('cors');

const port = 35000;

const app = express();
app.use(cors());

const httpServer = require('http').Server(app);
const io = require('socket.io')(httpServer,{
    cors: {
        origin: "*",
    }
  });

const rooms = new Map();

app.get('/rooms', function(_, res){
    res.status(200).json(rooms);
});

app.get('/users', function(_, res){
    res.status(200).send('<p>some html</p>');
});

io.on('connection', socket => {
    console.log(`connect ${socket.id}`);
    socket.send('Hello a new user!');

    socket.on('disconnect', reason => {
      console.log(`disconnect ${socket.id} due to ${reason}`);
    });
  });

httpServer.listen(port, (err)=>{
    if (err){
        throw Error(err);
    }

    console.log('Server up!');
});