import { Directive, HostBinding, Input } from '@angular/core';

type ColFlex =
  | 'xs'
  | 'sm'
  | 'md'
  | 'lg'
  | 'top'
  | 'fill'
  | number;

@Directive({
  selector: '[uxCol]',
})
export class ColDirective {
  private _colFlex: ColFlex;

  public get uxCol(): ColFlex {
    return this._colFlex;
  }

  @Input()
  public set uxCol(value: ColFlex) {
    console.log('value: ', value);

    this._colFlex = value;
  }

  @HostBinding('class')
  get colClass() {
    const colSize = this.uxCol
      ? ` ${this.uxCol}`
      : '';
    return `col${colSize}`;
  }
}
