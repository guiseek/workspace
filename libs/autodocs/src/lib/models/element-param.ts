import { FormElement } from '../controls';

export interface ElementParam {
  name: string;
  displayName?: string;
  elementType?: string;
  value?: any;
  required?: boolean;
  order?: number;
  elements?: FormElement[];
  layout?: any;
  options?: string[];
}
