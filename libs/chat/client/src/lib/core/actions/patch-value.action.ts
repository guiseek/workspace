import { FormData, ActionTypes } from '../../chat-client.types';

export class PatchValue {
  type = ActionTypes.PatchValue;

  constructor(public payload: Partial<FormData>) {}
}
