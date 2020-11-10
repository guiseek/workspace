import { BooleanControl } from './control-boolean';
// #docregion
import { Injectable } from '@angular/core';

import { DropdownControl } from './control-dropdown';
import { ControlBase } from './control-base';
import { TextboxControl } from './control-textbox';
import { compodoc } from '../../interfaces';

@Injectable({
  providedIn: 'root',
})
export class ControlService {
  toControls({ inputsClass }: Pick<compodoc.Component, 'inputsClass'>) {
    return inputsClass.map((ic) => this.toControl(ic));
  }

  toControl({ name, type, defaultValue }: compodoc.InputsClass) {
    return new (this.checkControlType(type))({
      label: name,
      key: name,
      type: type,
      value: defaultValue ?? '',
    });
  }
  checkControlType(type: compodoc.InputsClassType) {
    switch (type) {
      case compodoc.InputsClassType.Boolean:
        return BooleanControl;
      case compodoc.InputsClassType.String:
      case compodoc.InputsClassType.Number:
      case compodoc.InputsClassType.TextEmailPassword:
        return TextboxControl;
      default:
        return TextboxControl;
    }
  }
  // TODO: get from a remote source of control metadata
  // TODO: make asynchronous
  getControls() {
    const controls: ControlBase<any>[] = [
      new DropdownControl({
        key: 'brave',
        label: 'Bravery Rating',
        options: [
          { key: 'solid', value: 'Solid' },
          { key: 'great', value: 'Great' },
          { key: 'good', value: 'Good' },
          { key: 'unproven', value: 'Unproven' },
        ],
        order: 3,
      }),

      new TextboxControl({
        key: 'firstName',
        label: 'First name',
        value: 'Bombasto',
        required: true,
        order: 1,
      }),

      new TextboxControl({
        key: 'emailAddress',
        label: 'Email',
        type: 'email',
        order: 2,
      }),
    ];

    return controls.sort((a, b) => a.order - b.order);
  }
}
