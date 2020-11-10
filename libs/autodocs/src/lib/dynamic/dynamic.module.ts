import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DynamicIoModule } from './dynamic-io';
import { DynamicComponent } from './dynamic.component';
import { DynamicControlModule } from './dynamic-controls';

@NgModule({
  imports: [CommonModule, DynamicIoModule, DynamicControlModule],
  exports: [DynamicComponent, DynamicIoModule, DynamicControlModule],
  declarations: [DynamicComponent],
})
export class DynamicModule {}
