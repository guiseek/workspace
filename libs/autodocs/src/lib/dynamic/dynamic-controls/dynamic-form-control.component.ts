// #docregion
import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { ControlBase } from './control-base';
import { DropdownControl } from './control-dropdown';

@Component({
  selector: 'autodocs-control',
  templateUrl: './dynamic-form-control.component.html',
})
export class DynamicFormControlComponent {
  @Input() control: DropdownControl;
  @Input() form: FormGroup;
  get isValid() {
    return this.form.controls[this.control.key].valid;
  }
}
