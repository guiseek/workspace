import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { GridRoutingModule } from './grid-routing.module';
import { GridComponent } from './grid.component';
import { ExampleComponent } from './example/example.component';
import { PaperLayoutModule } from '@nx-ux/paper';

const routes: Routes = [
  { path: '', component: GridComponent }
];

@NgModule({
  declarations: [GridComponent, ExampleComponent],
  imports: [
    CommonModule,
    PaperLayoutModule,
    GridRoutingModule,
    RouterModule.forChild(routes)
  ]
})
export class GridModule { }
