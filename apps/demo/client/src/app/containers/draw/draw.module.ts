import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { DrawRoutingModule } from './draw-routing.module';
import { DrawComponent } from './draw.component';

const routes: Routes = [
  { path: '', component: DrawComponent }
];

@NgModule({
  declarations: [DrawComponent],
  imports: [
    CommonModule,
    DrawRoutingModule,
    RouterModule.forChild(routes)
  ]
})
export class DrawModule { }
