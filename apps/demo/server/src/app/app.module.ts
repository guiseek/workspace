import { Module } from '@nestjs/common';

import { ChatServerModule } from '@nx-feat/chat-server';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [ChatServerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
