import { FormData, ActionTypes } from '../../chat-client.types';

export class ValuePatched {
  type = ActionTypes.ValuePatched;

  constructor(public payload: Partial<FormData>) {}
}
