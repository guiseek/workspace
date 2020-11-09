import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(
      [
        {
          path: '',
          loadChildren: () =>
            import('./home/home.module').then((m) => m.HomeModule),
        },
        {
          path: 'blog',
          loadChildren: () =>
            import('./blog/blog.module').then((m) => m.BlogModule),
        },
        {
          path: 'code',
          loadChildren: () =>
            import('./code/code.module').then((m) => m.CodeModule),
        },
      ],
      { initialNavigation: 'enabled' }
    ),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
