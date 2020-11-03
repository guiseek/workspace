import { FormData, ActionTypes } from '../../chat-client.types';

export class Data {
  type = ActionTypes.Data;

  constructor(public payload: Partial<FormData>) {}
}
