import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[uxPhotoGallery]',
})
export class PhotoGalleryDirective {
  @HostBinding('class.ux-photo-gallery')
  uxPhotoGallery = true;

  private _rowSize = '300px';
  @Input() set rowSize(rowSize: string) {
    this._rowSize = rowSize;
  }
  @HostBinding('style') get varRowSize() {
    return `--ux-grid-template-rows: ${this.rowSize}`;
  }
  get rowSize() {
    return this._rowSize;
  }

  private _columnSize = '320px';
  @Input() set columnSize(columnSize: string) {
    this._columnSize = columnSize;
  }
  @HostBinding('style') get varColumnSize() {
    return `--ux-grid-template-columns: ${this.columnSize}`;
  }
  get columnSize() {
    return this._columnSize;
  }
}
