import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ScullyLibModule} from '@scullyio/ng-lib';
import {CodeRoutingModule} from './code-routing.module';
import {CodeComponent} from './code.component';

@NgModule({
  declarations: [CodeComponent],
  imports: [CommonModule, CodeRoutingModule, ScullyLibModule],
})
export class CodeModule {}
