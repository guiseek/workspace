import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ChatClientModule } from '@nx-feat/chat-client';
import { ChatComponent } from './chat.component';
import { AuthController } from './auth/auth.controller';


const routes: Routes = [
  { path: '', component: ChatComponent }
];

@NgModule({
  declarations: [ChatComponent, AuthController],
  imports: [
    CommonModule,
    ChatClientModule,
    RouterModule.forChild(routes)
  ]
})
export class ChatModule { }
