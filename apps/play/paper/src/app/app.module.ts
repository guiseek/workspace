import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { PaperFormsModule, PaperLayoutModule } from '@nx-ux/paper';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { FormComponent } from './form/form.component';

@NgModule({
  declarations: [AppComponent, FormComponent],
  imports: [
    BrowserModule,
    PaperFormsModule,
    PaperLayoutModule,
    ReactiveFormsModule,
    RouterModule.forRoot(
      [
        {
          path: '',
          component: FormComponent,
        },
      ],
      { initialNavigation: 'enabled' }
    ),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
