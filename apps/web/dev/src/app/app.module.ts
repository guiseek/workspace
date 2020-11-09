import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ScullyLibModule } from '@scullyio/ng-lib';
import { AppRoutingModule } from './app-routing.module';
import { PaperNavbarModule } from '@nx-ux/paper';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    ScullyLibModule,
    PaperNavbarModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
