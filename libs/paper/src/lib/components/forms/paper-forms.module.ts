import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { LegendDirective } from './legend.directive';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { CheckboxGroupComponent } from './checkbox/checkbox-group.component';
import { EnterPasswordComponent } from './enter-password/enter-password.component';
import { InputComponent } from './input/input.component';
import { FormGroupComponent } from './form-group/form-group.component';
import { ValueAccessorDirective } from './value-accessor.directive';
import { LabelDirective } from './label.directive';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule],
  declarations: [
    CheckboxComponent,
    CheckboxGroupComponent,
    FormGroupComponent,
    InputComponent,
    LabelDirective,
    LegendDirective,
    EnterPasswordComponent,
    ValueAccessorDirective,
  ],
  exports: [
    CheckboxComponent,
    CheckboxGroupComponent,
    FormGroupComponent,
    InputComponent,
    LabelDirective,
    LegendDirective,
    EnterPasswordComponent,
    ValueAccessorDirective,
  ],
})
export class PaperFormsModule {}
