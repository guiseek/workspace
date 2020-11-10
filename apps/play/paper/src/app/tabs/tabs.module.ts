import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { PaperTabsModule, PaperLayoutModule } from '@nx-ux/paper';

import { TabsRoutingModule } from './tabs-routing.module';
import { TabsComponent } from './tabs.component';
import { OverviewComponent } from './overview/overview.component';
import { ApiComponent } from './api/api.component';
import { ExampleComponent } from './example/example.component';

const routes: Routes = [{ path: '', component: TabsComponent }];

@NgModule({
  declarations: [
    TabsComponent,
    OverviewComponent,
    ApiComponent,
    ExampleComponent,
  ],
  imports: [
    CommonModule,
    PaperTabsModule,
    PaperLayoutModule,
    TabsRoutingModule,
    RouterModule.forChild(routes),
  ],
})
export class TabsModule {}
