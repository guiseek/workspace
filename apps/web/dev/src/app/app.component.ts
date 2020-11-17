import { Component } from '@angular/core';

@Component({
  selector: 'seek-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'web-dev';

  navLeft = [
    {
      title: 'Artigos',
      url: 'articles',
      color: '',
    },
    {
      title: 'Feedback',
      url: 'feedback',
      color: '',
    },
    {
      title: 'Anotações',
      url: 'notes',
      color: '',
    },
  ];
  navRight = [
    {
      title: 'Projetos',
      url: 'projects',
      color: '',
    },
    {
      title: 'Tools',
      url: 'tools',
      color: '',
    },
    {
      title: 'Album de fotos',
      url: 'photos',
      color: '',
    },
  ];
}
