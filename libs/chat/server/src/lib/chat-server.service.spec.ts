import { Test } from '@nestjs/testing';
import { ChatServerService } from './chat-server.service';

describe('ChatServerService', () => {
  let service: ChatServerService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ChatServerService],
    }).compile();

    service = module.get(ChatServerService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
