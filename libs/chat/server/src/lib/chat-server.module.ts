import { Module } from '@nestjs/common';
import { ChatServerService } from './chat-server.service';
import { ChatServerController } from './chat-server.controller';
import { ChatEventsGateway } from './chat-events.gateway';

@Module({
  controllers: [ChatServerController],
  providers: [ChatServerService, ChatEventsGateway],
  exports: [ChatServerService],
})
export class ChatServerModule {}
