import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ChatClientModule } from '@nx-feat/chat-client';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    ChatClientModule,
    RouterModule.forRoot([], { initialNavigation: 'enabled' }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
