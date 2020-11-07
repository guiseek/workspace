import { Component, HostBinding, Input, OnInit } from '@angular/core';

@Component({
  selector: 'section[ux-tab-content]',
  template: `<ng-content></ng-content>`,
})
export class TabContentComponent {
  static nextId = 0;

  private _id = `paper-tab-content${TabContentComponent.nextId++}`;
  public get id() {
    return this._id;
  }
  @Input()
  @HostBinding('id')
  public set id(value) {
    this._id = value;
  }

  @HostBinding('class.content')
  content = true;
}
