import { AttachmentState } from '@reducers/attachment';

export enum MessageType {
  Incoming,
  Outgoing,
}

export enum MessageActionType {
  Send = 'send',
  Receive = 'receive',
}

export type MessageAction = {
  type: MessageActionType;
  payload: Omit<MessageState, 'type'>;
};

export type MessageState = {
  id: string;
  username: string;
  message: string;
  attachments: AttachmentState[];
  type: MessageType;
};

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

export default reducer;
