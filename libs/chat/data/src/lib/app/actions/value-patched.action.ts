import { ActionTypes, FormData } from '@nx-feat/chat-data';

export class ValuePatched {
  type = ActionTypes.ValuePatched;

  constructor(public payload: Partial<FormData>) {}
}
