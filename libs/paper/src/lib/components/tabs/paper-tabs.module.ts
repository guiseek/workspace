import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsComponent } from './tabs.component';
import { TabComponent } from './tab.component';
import { TabContentComponent } from './tab-content.component';
import { PaperLayoutModule } from '../../layout';

@NgModule({
  declarations: [TabsComponent, TabComponent, TabContentComponent],
  imports: [CommonModule, PaperLayoutModule],
  exports: [TabsComponent, TabComponent, TabContentComponent],
})
export class PaperTabsModule {}
