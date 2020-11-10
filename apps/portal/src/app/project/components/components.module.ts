import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ComponentsComponent } from './components.component';
import { ComponentComponent } from './component/component.component';
import { PreviewModule } from '@nx-feat/autodocs';

const routes: Routes = [
  { path: '', component: ComponentsComponent },
  { path: ':component', component: ComponentComponent },
];

@NgModule({
  declarations: [ComponentsComponent, ComponentComponent],
  imports: [CommonModule, PreviewModule, RouterModule.forChild(routes)],
})
export class ComponentsModule {}
