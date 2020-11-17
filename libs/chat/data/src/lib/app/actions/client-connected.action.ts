import { ActionTypes } from '@nx-feat/chat-data';

export class ClientConnected {
  type = ActionTypes.ClientConnected;

  constructor(public payload: string[]) {}
}
