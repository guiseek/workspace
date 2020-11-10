import { Component, OnInit } from '@angular/core';
import { Preview, compodoc, PreviewContainer } from '@nx-feat/autodocs';

@Component({
  selector: 'portal-component',
  templateUrl: './component.component.html',
  styleUrls: ['./component.component.scss'],
})
export class ComponentComponent implements OnInit {
  constructor(private preview: Preview) {}

  ngOnInit() {}

  openPreview(component: compodoc.Component) {
    this.preview.openFromComponent(PreviewContainer, { data: component });
  }
}
