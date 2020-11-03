import { FormData } from '../../chat-client.types';

export interface State {
  connectedClients: string[];
  data: Partial<FormData>;
}
