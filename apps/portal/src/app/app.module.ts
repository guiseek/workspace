import { components } from './config/components';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AutodocsModule } from '@nx-feat/autodocs';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { environment } from '../environments/environment';
import { HomeComponent } from './home/home.component';
import { ProjectComponent } from './project/project.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: ':project',
    component: ProjectComponent,
    children: [
      {
        path: 'components',
        loadChildren: () =>
          import('./project/components/components.module').then(
            (m) => m.ComponentsModule
          ),
      },
    ],
  },
];

@NgModule({
  declarations: [AppComponent, HomeComponent, ProjectComponent],
  imports: [
    BrowserModule,
    AutodocsModule.forRoot({
      components: components,
    }),
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes, { initialNavigation: 'enabled' }),
  ],
  providers: [
    { provide: 'docs', useValue: environment.docs },
    // { provide: 'docs', useValue: '/compodoc' }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
