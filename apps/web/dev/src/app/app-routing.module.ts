import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PhotosComponent } from './pages/photos/photos.component';
import { ArticlesComponent } from './pages/articles/articles.component';
import { FeedbackComponent } from './pages/feedback/feedback.component';
import { NotesComponent } from './pages/notes/notes.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { ToolsComponent } from './pages/tools/tools.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(
      [
        {
          path: 'articles',
          component: ArticlesComponent,
        },
        {
          path: 'feedback',
          component: FeedbackComponent,
        },
        {
          path: 'notes',
          component: NotesComponent,
        },
        {
          path: 'photos',
          component: PhotosComponent,
        },
        {
          path: 'tools',
          component: ToolsComponent,
        },
        {
          path: 'projects',
          component: ProjectsComponent,
        },
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
