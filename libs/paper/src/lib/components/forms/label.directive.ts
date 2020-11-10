import { Directive } from '@angular/core';

@Directive({
  selector: '[uxLabel], label[ux-label]',
})
export class LabelDirective {}
