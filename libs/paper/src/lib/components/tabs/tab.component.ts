import {
  Component,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'label[ux-tab]',
  template: `
    <ng-content></ng-content>
    <input [id]="for" type="radio" [name]="name" [checked]="active" />
  `,
})
export class TabComponent {
  static nextId = 0;

  private _for = `paper-tab${TabComponent.nextId++}`;
  public get for() {
    return this._for;
  }
  @Input()
  @HostBinding('for')
  public set for(value) {
    this._for = value;
  }

  @Input()
  @HostBinding('attr.name')
  name = `paper-tabs`;

  @Input()
  @HostBinding('class.active')
  active = false;

  @Output()
  selected = new EventEmitter<TabComponent>();

  @HostListener('click')
  onClicked() {
    this.selected.emit(this);
  }
}
