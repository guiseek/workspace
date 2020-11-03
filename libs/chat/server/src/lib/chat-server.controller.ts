import { Controller } from '@nestjs/common';
import { ChatServerService } from './chat-server.service';

@Controller('chat-server')
export class ChatServerController {
  constructor(private chatServerService: ChatServerService) {}
}
