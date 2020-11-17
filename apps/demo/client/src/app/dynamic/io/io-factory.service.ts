import {
  ComponentFactoryResolver,
  Inject,
  Injectable,
  KeyValueDiffers,
} from '@angular/core';

import { EventArgumentToken } from './event-argument';
import { IoService } from './io.service';

@Injectable({ providedIn: 'root' })
export class IoFactoryService {
  constructor(
    private differs: KeyValueDiffers,
    private cfr: ComponentFactoryResolver,
    @Inject(EventArgumentToken)
    private eventArgument: string,
  ) {}

  create() {
    return new IoService(this.differs, this.cfr, this.eventArgument);
  }
}
