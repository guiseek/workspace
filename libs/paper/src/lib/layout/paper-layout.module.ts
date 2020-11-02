import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContainerDirective } from './container.directive';
import { ColDirective } from './col.directive';
import { RowDirective } from './row.directive';

@NgModule({
  declarations: [ContainerDirective, RowDirective, ColDirective],
  imports: [CommonModule],
  exports: [ContainerDirective, RowDirective, ColDirective],
})
export class PaperLayoutModule {}
