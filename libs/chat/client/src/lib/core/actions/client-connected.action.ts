import { ActionTypes } from '../../chat-client.types';

export class ClientConnected {
  type = ActionTypes.ClientConnected;

  constructor(public payload: string[]) {}
}
