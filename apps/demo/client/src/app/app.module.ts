import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';

import { DynamicModule } from './dynamic/dynamic.module';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { ChatClientModule } from '@nx-feat/chat-client';

import { AppComponent } from './app.component';

import { LoginForm } from './login/login.form';
import { PasswordForm } from './forms/password/password.form';
import { PhoneForm } from './forms/phone/phone.form';
import { EmailForm } from './forms/email/email.form';

import { PreviewContainer } from './containers/preview/preview.container';
import { ComponentsContainer } from './containers/preview/components/components.container';
import { InteractionContainer } from './containers/preview/interaction/interaction.container';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AppComponent,
    LoginForm,
    PasswordForm,
    PhoneForm,
    EmailForm,
    PreviewContainer,
    ComponentsContainer,
    InteractionContainer,
  ],
  imports: [
    BrowserModule,
    DynamicModule,
    DragDropModule,
    ChatClientModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(
      [
        {
          path: '',
          component: PreviewContainer,
        },
      { path: 'draw', loadChildren: () => import('./containers/draw/draw.module').then(m => m.DrawModule) },
      ],
      { initialNavigation: 'enabled' }
    ),
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [
    LoginForm,
    PasswordForm,
    PhoneForm,
    EmailForm,
    PreviewContainer,
    ComponentsContainer,
    InteractionContainer,
  ],
})
export class AppModule {}
