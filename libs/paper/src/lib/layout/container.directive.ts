import { Directive, HostBinding, Input } from '@angular/core';

type ContainerSize = 'xs' | 'sm' | 'md' | 'lg';

@Directive({
  selector: '[uxContainer]',
})
export class ContainerDirective {
  private _uxContainer: ContainerSize;

  public get uxContainer(): ContainerSize {
    return this._uxContainer;
  }

  @Input()
  public set uxContainer(value: ContainerSize) {
    console.log('value: ', value);

    this._uxContainer = value;
  }

  @HostBinding('class')
  get containerClass() {
    const containerSize = this.uxContainer
      ? ` container-${this.uxContainer}`
      : '';
    return `container${containerSize}`;
  }
}
