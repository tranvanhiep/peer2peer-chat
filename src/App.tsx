import {
  ChatBox,
  Layout,
  MessageGroup,
  MessageType,
  Modal,
} from '@components/index';
import { useCallback, useEffect, useReducer, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';

type MessageState = {
  id: string;
  username: string;
  message: string;
  type: MessageType;
};

enum MessageActionType {
  Send = 'send',
  Receive = 'receive',
}

type MessageAction = {
  type: MessageActionType;
  payload: Omit<MessageState, 'type'>;
};

const initialState: MessageState[] = [];

const reducer = (state: MessageState[], action: MessageAction) => {
  const { type, payload } = action;

  switch (type) {
    case MessageActionType.Send:
      return [...state, { ...payload, type: MessageType.Outgoing }];
    case MessageActionType.Receive:
      return [...state, { ...payload, type: MessageType.Incoming }];
    default:
      return state;
  }
};

function App() {
  const [open, setOpen] = useState<boolean>(false);
  const socketRef = useRef<Socket>(io());
  const [messages, setMessages] = useReducer(reducer, initialState);

  useEffect(() => {
    const name = localStorage.getItem('name');

    if (!name?.trim()) {
      setOpen(true);
    }

    return () => localStorage.removeItem('name');
  }, [setOpen]);

  useEffect(() => {
    const { current: socket } = socketRef;

    socket.on('connect', () => {
      const { connected } = socket;

      console.log(connected ? 'Connected' : 'Failed to connect');
    });

    socket.on('disconnect', (reason) => {
      const { disconnected } = socket;

      if (reason === 'io client disconnect') {
        socket.connect();
      }

      console.log(
        disconnected ? 'Disconnected: ' : 'Failed to disconnect: ',
        reason
      );
    });

    socket.on('connect_error', () => {
      console.log('Can not establish connection to the server');
    });

    socket.on('message', (data: Omit<MessageState, 'type'>) => {
      setMessages({ type: MessageActionType.Receive, payload: data });
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const submit = useCallback((message: string) => {
    const { current: socket } = socketRef;
    const username = localStorage.getItem('name') || 'Guest';

    socket.emit(
      'message',
      { message, username },
      (data: Omit<MessageState, 'type'>) =>
        setMessages({
          type: MessageActionType.Send,
          payload: data,
        })
    );
  }, []);

  return (
    <>
      <Layout>
        {messages.map(({ message, type, username, id }) => (
          <MessageGroup
            key={id}
            name={username}
            type={type}
            content={message}
          />
        ))}
        <ChatBox submit={submit} />
      </Layout>
      <Modal open={open} />
    </>
  );
}

export default App;
