import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicFormComponent } from './dynamic-form.component';
import { DynamicFormControlComponent } from './dynamic-form-control.component';
import { DynamicControlService } from './dynamic-control.service';
import { ControlService } from './control.service';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule],
  exports: [DynamicFormComponent, DynamicFormControlComponent],
  providers: [ControlService, DynamicControlService],
  declarations: [DynamicFormComponent, DynamicFormControlComponent],
})
export class DynamicControlModule {}
