import { NgModule } from '@angular/core';
import { LayoutModule } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { ContainerDirective } from './container.directive';
import { ColDirective } from './col.directive';
import { RowDirective } from './row.directive';
import { GridDirective } from './grid.directive';
import { PhotoGalleryDirective } from './photo-gallery.directive';

@NgModule({
  declarations: [
    ContainerDirective,
    RowDirective,
    ColDirective,
    GridDirective,
    PhotoGalleryDirective,
  ],
  imports: [CommonModule, LayoutModule],
  exports: [
    ContainerDirective,
    RowDirective,
    ColDirective,
    GridDirective,
    PhotoGalleryDirective,
  ],
})
export class PaperLayoutModule {}
