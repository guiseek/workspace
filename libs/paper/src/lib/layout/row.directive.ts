import { Directive, HostBinding, Input } from '@angular/core';

type RowFlex =
  | 'right'
  | 'center'
  | 'edges'
  | 'spaces'
  | 'top'
  | 'middle'
  | 'bottom';

@Directive({
  selector: '[uxRow]',
})
export class RowDirective {
  private _rowFlex: RowFlex;

  public get uxRow(): RowFlex {
    return this._rowFlex;
  }

  @Input()
  public set uxRow(value: RowFlex) {
    console.log('value: ', value);

    this._rowFlex = value;
  }

  @HostBinding('class')
  get rowClass() {
    const rowSize = this.uxRow
      ? ` ${this.uxRow}`
      : '';
    return `row${rowSize}`;
  }
}
