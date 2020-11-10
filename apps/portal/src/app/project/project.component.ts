import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { compodoc, CompodocService } from '@nx-feat/autodocs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'portal-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {
  project$: Observable<compodoc.Project>;
  compodoc$: Observable<compodoc.Compodoc>;

  constructor(
    private doc: CompodocService,
    private route: ActivatedRoute
  ) {
    this.project$ = this.route.params.pipe(
      switchMap(({ project = 'paper' }) => this.doc.findByName(project))
    );
  }

  ngOnInit() {
    this.compodoc$ = this.project$.pipe(
      switchMap((project) => this.doc.getDoc(project))
    );
  }

}
