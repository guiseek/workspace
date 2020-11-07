import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { PaperFormsModule, PaperTabsModule, PaperLayoutModule } from '@nx-ux/paper';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { FormComponent } from './form/form.component';

@NgModule({
  declarations: [AppComponent, FormComponent],
  imports: [
    BrowserModule,
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
      { path: 'store', loadChildren: () => import('./store/store.module').then(m => m.StoreModule) },
      ],
      { initialNavigation: 'enabled' }
    ),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
