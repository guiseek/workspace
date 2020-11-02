import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { LegendDirective } from './legend.directive';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { CheckboxGroupComponent } from './checkbox/checkbox-group.component';
import { InputComponent } from './input/input.component';
import { FormGroupComponent } from './form-group/form-group.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  declarations: [CheckboxComponent, CheckboxGroupComponent, LegendDirective, InputComponent, FormGroupComponent],
  exports: [CheckboxComponent, CheckboxGroupComponent, LegendDirective, InputComponent, FormGroupComponent]
})
export class PaperFormsModule { }
