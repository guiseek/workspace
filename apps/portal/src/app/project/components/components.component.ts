import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { compodoc, CompodocService, Preview, PreviewContainer } from '@nx-feat/autodocs';
import { switchMap, map } from 'rxjs/operators';

@Component({
  selector: 'portal-components',
  templateUrl: './components.component.html',
  styleUrls: ['./components.component.scss'],
})
export class ComponentsComponent implements OnInit {
  components$: Observable<compodoc.Component[]>;

  constructor(
    private route: ActivatedRoute,
    private doc: CompodocService,
    private preview: Preview
  ) {
    const { project } = this.route.parent.parent.snapshot.params;
    this.components$ = this.doc.findByName(project).pipe(
      switchMap(({ url }) => this.doc.getDoc({ url })),
      map((doc) => doc.components)
    );
  }

  ngOnInit(): void {
    // this.components$ =
    this.doc.project$?.subscribe((pro) => {
      console.log('pro ', pro);
    });

    this.doc.currentComponent$?.subscribe((cmp) => {
      console.log('cmp ', cmp);
    });
  }

  openPreview(component: compodoc.Component) {
    this.preview.openFromComponent(
      PreviewContainer,
      { data: component }
    )
  }

  select(component: compodoc.Component) {
    this.doc.setComponent(component)
    this.openPreview(component)
  }
}
