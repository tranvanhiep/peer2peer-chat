import * as dotenv from 'dotenv';
import express from 'express';
import { createServer } from 'http';
import { networkInterfaces } from 'os';
import { Server } from 'socket.io';

dotenv.config();

type Attachment = {
  id: string;
  file: File;
  type: string;
  name: string;
  lastModified: number;
};

type Message = {
  id: string;
  username: string;
  message: string;
  attachments: Attachment[];
  isDelivered: boolean;
};

const app = express();
const server = createServer(app);
const io = new Server(server, {
  path: '/chat/',
  maxHttpBufferSize: 1000e6,
  cors: {
    methods: ['GET', 'POST'],
    optionsSuccessStatus: 200,
    preflightContinue: true,
    maxAge: 24 * 60 * 60 * 1000,
  },
  serveClient: false,
});

app.use(express.static('dist'));

io.on('connection', (socket) => {
  const { address } = socket.handshake;
  const ip = /(\d+.?){4}/.exec(address);
  const client = ip?.length ? ip.at(0) || 'Unknown' : 'Host';

  socket.on('message', (data: Message, callback) => {
    const message = { ...data, isDelivered: true };

    socket.broadcast.emit('message', message);
    callback(message);
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
  console.log(`The app is hosted at ${getIP()}:${process.env.PORT}`);
});
