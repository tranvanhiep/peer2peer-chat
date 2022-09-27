import * as dotenv from 'dotenv';
import express from 'express';
import { createServer } from 'http';
import { networkInterfaces } from 'os';
import { Server } from 'socket.io';
import { createHash } from 'crypto';

dotenv.config();

type Message = {
  username: string;
  message: string;
};

const app = express();
const server = createServer(app);
const io = new Server(server);

app.use(express.static('dist'));

const hash = (message: Message) => {
  return createHash('sha1')
    .update(new Int8Array(message as never))
    .digest('hex');
};

io.on('connection', (socket) => {
  const { address } = socket.handshake;
  const ip = /(\d+.?){4}/.exec(address);
  const client = ip?.length ? ip.at(0) || 'Unknown' : 'Host';

  socket.on('message', (data: Message, callback) => {
    socket.broadcast.emit('message', data);
    callback({ ...data, id: hash(data) });
  });

  socket.on('disconnect', (reason) => {
    console.log(`${client} disconnected: `, reason);
  });

  console.log(`${client} has joined the chat`);
});

const getIP = () => {
  const networks = networkInterfaces();

  const currentNetwork = Object.values(networks)
    .flat()
    .find((net) => net?.family === 'IPv4' && !net.internal);

  return currentNetwork?.address;
};

server.listen(process.env.PORT, () => {
  console.log(`The app is host at ${getIP()}:${process.env.PORT}`);
});
