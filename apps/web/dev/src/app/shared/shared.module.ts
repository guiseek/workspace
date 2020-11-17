import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { StickyDirective } from './sticky.directive';
import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';
import { HeroComponent } from './hero/hero.component';

@NgModule({
  declarations: [HeaderComponent, StickyDirective, NavComponent, FooterComponent, HeroComponent],
  exports: [HeaderComponent, StickyDirective, NavComponent, FooterComponent, HeroComponent],
  imports: [CommonModule, RouterModule],
})
export class SharedModule {}
