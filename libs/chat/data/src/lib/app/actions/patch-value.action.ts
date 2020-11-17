import { ActionTypes, FormData } from '@nx-feat/chat-data';

export class PatchValue {
  type = ActionTypes.PatchValue;

  constructor(public payload: Partial<FormData>) {}
}
