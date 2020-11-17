import { FormData } from '@nx-feat/chat-data';

export interface State {
  connectedClients: string[];
  data: Partial<FormData>;
}
