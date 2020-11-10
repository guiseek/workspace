import { ModelParam } from './model-param';
import { Type } from '../enums/type.enum';

export class Model {
  name: string;
  type?: string;
 
  constructor(param : ModelParam) {
    this.name = param.name || '';
    this.type = param.type || Type.MyLady.toString();
    // let model: Model = new Model({ name: 'Adam', type: Type.MyMan })
  }
}
