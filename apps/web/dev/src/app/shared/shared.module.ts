import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { StickyDirective } from './sticky.directive';

@NgModule({
  declarations: [HeaderComponent, StickyDirective],
  exports: [HeaderComponent, StickyDirective],
  imports: [CommonModule],
})
export class SharedModule {}
