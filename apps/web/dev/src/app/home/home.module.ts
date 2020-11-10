import {
  PaperFormsModule,
  PaperLayoutModule,
  PaperNavbarModule,
  PaperTabsModule,
} from '@nx-ux/paper';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { HomeRoutingModule } from './home-routing.module';
import { ImageComponent } from './image.component';
import { HomeComponent } from './home.component';

@NgModule({
  declarations: [HomeComponent, ImageComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    PaperNavbarModule,
    HttpClientModule,
    PaperFormsModule,
    PaperTabsModule,
    PaperLayoutModule,
    ReactiveFormsModule,
  ],
})
export class HomeModule {}
