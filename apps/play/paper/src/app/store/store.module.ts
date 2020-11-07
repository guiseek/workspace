import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { StoreRoutingModule } from './store-routing.module';
import { StoreComponent } from './store.component';

const routes: Routes = [
  { path: '', component: StoreComponent }
];

@NgModule({
  declarations: [StoreComponent],
  imports: [
    CommonModule,
    StoreRoutingModule,
    RouterModule.forChild(routes)
  ]
})
export class StoreModule { }
