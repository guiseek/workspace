import { ScullyLibModule } from '@scullyio/ng-lib';
import {
  PaperFormsModule,
  PaperLayoutModule,
  PaperNavbarModule,
  PaperTabsModule,
  PaperAutocompleteModule
} from '@nx-ux/paper';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    SharedModule,
    HomeRoutingModule,
    PaperNavbarModule,
    HttpClientModule,
    PaperFormsModule,
    PaperTabsModule,
    PaperLayoutModule,
    ReactiveFormsModule,
    PaperAutocompleteModule,
    ScullyLibModule,
  ],
})
export class HomeModule {}
