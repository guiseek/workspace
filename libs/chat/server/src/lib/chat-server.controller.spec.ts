import { Test } from '@nestjs/testing';
import { ChatServerController } from './chat-server.controller';
import { ChatServerService } from './chat-server.service';

describe('ChatServerController', () => {
  let controller: ChatServerController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ChatServerService],
      controllers: [ChatServerController],
    }).compile();

    controller = module.get(ChatServerController);
  });

  it('should be defined', () => {
    expect(controller).toBeTruthy();
  });
});
