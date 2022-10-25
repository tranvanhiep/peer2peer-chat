import { AttachmentState } from '@reducers/attachment';

export enum MessageType {
  Incoming,
  Outgoing,
}

export enum MessageActionType {
  Send = 'send',
  Receive = 'receive',
  Deliver = 'deliver',
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
  isDelivered: boolean;
};

const reducer = (state: MessageState[], action: MessageAction) => {
  const { type, payload } = action;

  switch (type) {
    case MessageActionType.Send:
      return [...state, { ...payload, type: MessageType.Outgoing }];
    case MessageActionType.Deliver:
      return state.map((item) => {
        if (item.id !== payload.id) {
          return item;
        }

        return { ...item, isDelivered: true };
      });
    case MessageActionType.Receive:
      return [...state, { ...payload, type: MessageType.Incoming }];
    default:
      return state;
  }
};

export default reducer;
