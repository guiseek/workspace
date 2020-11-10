import { ControlBase } from './control-base';

export class BooleanControl extends ControlBase<any> {
  controlType = 'boolean';
  type = 'checkbox';

  constructor(options: {} = {}) {
    super(options);
    this.type = !!options['type'] ? this.checkType(options['type']) : this.type;
  }
}
