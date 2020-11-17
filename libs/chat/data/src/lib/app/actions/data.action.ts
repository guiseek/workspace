import { ActionTypes, FormData } from '@nx-feat/chat-data';

export class Data {
  type = ActionTypes.Data;

  constructor(public payload: Partial<FormData>) {}
}
