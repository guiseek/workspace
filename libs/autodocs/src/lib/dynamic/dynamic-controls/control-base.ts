import { compodoc } from '../../interfaces';

export type ControlType =
  | 'text'
  | 'number'
  | 'email'
  | 'password'
  | 'checkbox'
  | string;

export class ControlBase<T> {
  value: T;
  type: ControlType = 'text';
  key: string;
  label: string;
  required: boolean;
  order: number;
  controlType: string;

  constructor(
    options: {
      value?: T;
      key?: string;
      label?: string;
      required?: boolean;
      order?: number;
      controlType?: string;
    } = {}
  ) {
    this.value = options.value;
    this.key = options.key || '';
    this.label = options.label || '';
    this.required = !!options.required;
    this.order = options.order === undefined ? 1 : options.order;
    this.controlType = options.controlType || '';
  }
  checkType(type: compodoc.InputsClassType) {
    switch (type) {
      case compodoc.InputsClassType.Boolean:
        return 'checkbox';
      case 'number':
        return 'number';
      case compodoc.InputsClassType.String:
      case compodoc.InputsClassType.TextEmailPassword:
        return 'text';
      default:
        return 'text';
    }
  }
}
