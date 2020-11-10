import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[uxPhotoGallery]',
})
export class PhotoGalleryDirective {
  @HostBinding('class.ux-photo-gallery')
  uxPhotoGallery = true;

  @HostBinding('style')
  get properties(): string {
    return `
      ${this.varRowSize};
      ${this.varGapSize};
      ${this.varColumnSize};
    `;
  }

  private _gapSize = '300px';
  @Input() set gapSize(gapSize: string) {
    this._gapSize = gapSize;
  }
  get varGapSize() {
    return `--ux-grid-gap: ${this.gapSize}`;
  }
  get gapSize() {
    return this._gapSize;
  }

  private _rowSize = '300px';
  @Input() set rowSize(rowSize: string) {
    this._rowSize = rowSize;
  }
  get varRowSize() {
    return `--ux-grid-template-rows: ${this.rowSize}`;
  }
  get rowSize() {
    return this._rowSize;
  }

  private _columnSize = '320px';
  @Input() set columnSize(columnSize: string) {
    this._columnSize = columnSize;
  }
  get varColumnSize() {
    return `--ux-grid-template-columns: ${this.columnSize}`;
  }
  get columnSize() {
    return this._columnSize;
  }
}
