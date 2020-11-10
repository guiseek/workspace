// #docregion
import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { compodoc } from '../../interfaces';

import { ControlBase } from './control-base';

@Injectable()
export class DynamicControlService {
  constructor() {}

  toFormGroup(controls: ControlBase<any>[]) {
    const group: any = {};

    controls.forEach((control) => {
      group[control.key] = control.required
        ? new FormControl(control.value || '', Validators.required)
        : new FormControl(control.value || '');
    });
    return new FormGroup(group);
  }
}
