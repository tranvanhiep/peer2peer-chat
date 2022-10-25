import ChatBox from '@components/ChatBox/ChatBox';
import MessageGroup from '@components/MessageGroup/MessageGroup';
import Modal from '@components/Modal/Modal';
import { AttachmentState } from '@reducers/attachment';
import reducer, { MessageActionType, MessageState } from '@reducers/message';
import genId from '@utils/genId';
import { Layout } from 'App.styled';
import { useCallback, useEffect, useReducer, useState } from 'react';
import { io } from 'socket.io-client';

type IncomingAttachmentState = Omit<AttachmentState, 'file'> & {
  file: ArrayBuffer;
};

type IncomingMessageState = Omit<MessageState, 'attachments'> & {
  attachments: IncomingAttachmentState[];
};

const initialState: MessageState[] = [];

const socket = io({ path: '/chat/' });

function App() {
  const [open, setOpen] = useState<boolean>(false);
  const [messages, setMessages] = useReducer(reducer, initialState);

  const transformIncomingAttachments = useCallback(
    (attachments: IncomingAttachmentState[]) =>
      attachments.map(({ file, type, lastModified, name, ...rest }) => {
        const newFile = new File([file], name, { type, lastModified });

        return { file: newFile, type, lastModified, name, ...rest };
      }),
    []
  );

  useEffect(() => {
    const name = localStorage.getItem('name');

    if (!name?.trim()) {
      setOpen(true);
    }

    return () => localStorage.removeItem('name');
  }, [setOpen]);

  useEffect(() => {
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

    socket.on('message', (data: Omit<IncomingMessageState, 'type'>) => {
      const attachments = transformIncomingAttachments(data.attachments);

      setMessages({
        type: MessageActionType.Receive,
        payload: { ...data, attachments },
      });
    });

    return () => {
      socket.disconnect();
    };
  }, [transformIncomingAttachments]);

  const submit = useCallback(
    (message: string, attachments: AttachmentState[]) => {
      const username = localStorage.getItem('name') || 'Guest';
      const payload = { id: genId(), message, username, attachments };
      setMessages({
        type: MessageActionType.Send,
        payload: { ...payload, isDelivered: false },
      });

      socket.emit(
        'message',
        payload,
        (data: Omit<IncomingMessageState, 'type'>) => {
          const attachments = transformIncomingAttachments(data.attachments);

          setMessages({
            type: MessageActionType.Deliver,
            payload: { ...data, attachments },
          });
        }
      );
    },
    [transformIncomingAttachments]
  );

  return (
    <>
      <Layout>
        {messages.map(
          ({ message, type, username, id, attachments, isDelivered }) => (
            <MessageGroup
              key={id}
              name={username}
              type={type}
              content={message}
              attachments={attachments}
              isDelivered={isDelivered}
            />
          )
        )}
        <ChatBox submit={submit} />
      </Layout>
      <Modal open={open} />
    </>
  );
}

export default App;
