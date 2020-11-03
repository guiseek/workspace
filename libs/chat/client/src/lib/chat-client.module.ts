import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { ReactiveFormsModule } from '@angular/forms';
import { ChatClientComponent } from './chat-client.component';

const config: SocketIoConfig = {
  url: 'http://localhost:3333',
  options: {},
};

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, SocketIoModule.forRoot(config)],
  declarations: [ChatClientComponent],
  exports: [ChatClientComponent],
})
export class ChatClientModule {}
