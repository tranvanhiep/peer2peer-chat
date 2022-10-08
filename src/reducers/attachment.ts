export type AttachmentState = {
  id: string;
  file: File;
  name: string;
  type: string;
  lastModified: number;
};

export enum AttachmentActionType {
  Add = 'add',
  Remove = 'remove',
  Clear = 'clear',
}

export type AttachmentAction = {
  type: AttachmentActionType;
  payload?: AttachmentState[] | Pick<AttachmentState, 'id'>;
};

const reducer = (state: AttachmentState[], action: AttachmentAction) => {
  const { payload, type } = action;

  switch (type) {
    case AttachmentActionType.Add:
      if (!Array.isArray(payload)) {
        return state;
      }

      return [...state, ...payload];
    case AttachmentActionType.Remove:
      if (!payload || Array.isArray(payload)) {
        return state;
      }

      return state.filter((item) => item.id !== payload.id);
    case AttachmentActionType.Clear:
      return [];
    default:
      return state;
  }
};

export default reducer;
