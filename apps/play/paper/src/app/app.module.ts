import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { PaperFormsModule, PaperTabsModule, PaperLayoutModule } from '@nx-ux/paper';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { FormComponent } from './form/form.component';

@NgModule({
  declarations: [AppComponent, FormComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    PaperFormsModule,
    PaperTabsModule,
    PaperLayoutModule,
    ReactiveFormsModule,
    RouterModule.forRoot(
      [
        // {
        //   path: '',
        //   component: FormComponent,
        // },
        {
          path: '',
          pathMatch: 'full',
          redirectTo: 'tabs'
        },
        {
          path: 'tabs',
          loadChildren: () =>
            import('./tabs/tabs.module').then((m) => m.TabsModule),
        },
      { path: 'grid', loadChildren: () => import('./grid/grid.module').then(m => m.GridModule) },
      ],
      { initialNavigation: 'enabled' }
    ),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
