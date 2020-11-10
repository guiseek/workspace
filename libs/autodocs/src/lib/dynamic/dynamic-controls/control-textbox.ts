// #docregion
import { ControlBase } from './control-base';

export class TextboxControl extends ControlBase<string> {
  controlType = 'textbox';
  type = 'text';

  constructor(options: {} = {}) {
    super(options);
    this.type = !!options['type'] ? this.checkType(options['type']) : this.type;
  }
}
