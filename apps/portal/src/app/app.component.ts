import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Component } from '@angular/core';
import { compodoc, CompodocService } from '@nx-feat/autodocs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'portal-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'portal';

  project$: Observable<compodoc.Project>;

  constructor(private doc: CompodocService, private route: ActivatedRoute) {
    this.project$ = this.route.params.pipe(
      switchMap(({ project = 'paper' }) => this.doc.findByName(project))
    );
  }
}
