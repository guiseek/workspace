import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { compodoc } from '../../interfaces/compodoc.interfaces';
import { CompodocEntry, CompodocSection } from './sidenav.interfaces';

@Component({
  selector: 'autodocs-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements OnInit {
  @Input() prefix = '';
  @Input() project: compodoc.Project;

  @Output() itemChange = new EventEmitter();

  public navigation: CompodocSection[] = [];
  private _documentation: compodoc.Compodoc;
  @Input() set documentation(doc: compodoc.Compodoc) {
    this._documentation = doc;
    if (doc) {
      this.navigation = Object.entries(doc)
        .filter(([_, v]) => Array.isArray(v))
        .map(([section, items]: CompodocEntry) => ({ section, items }))
    }
  }
  get documentation(): compodoc.Compodoc {
    return this._documentation;
  }

  ngOnInit(): void {
    if (this.documentation) {
      console.log(this.documentation);
      const sections = Object.entries(this.documentation).map(
        ([key, values]) => {
          console.log(key);
        }
      );
      console.log(sections);
    }
  }
}
