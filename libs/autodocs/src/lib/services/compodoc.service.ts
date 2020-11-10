import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Subject, Observable, from } from 'rxjs';
import { compodoc } from '../interfaces/compodoc.interfaces';

@Injectable({
  providedIn: 'root',
})
export class CompodocService {
  _currentProject = new Subject<compodoc.Project>();
  currentProject$ = this._currentProject.asObservable();

  project$: Observable<compodoc.Project>;

  _currentComponent = new Subject<compodoc.Component>();
  currentComponent$ = this._currentComponent.asObservable();

  component$: Observable<compodoc.Component>;
  constructor(
    private http: HttpClient,
    @Inject('docs') private docs: compodoc.Project[]
  ) {}

  setProject(project: compodoc.Project) {
    this._currentProject.next(project);
  }
  setComponent(component: compodoc.Component) {
    this._currentComponent.next(component);
  }

  getDocs() {
    return this.docs;
  }
  findDocs() {
    return from([this.docs]);
  }
  findByName(name: string) {
    return this.findDocs().pipe(
      map((docs) => docs.find((doc) => doc.name === name))
    );
  }
  findByPath(path: string) {
    return this.findByName(this.normalizeName(path));
  }
  getDoc({ url }) {
    return this.http.get<compodoc.Compodoc>(url);
  }
  private normalizeName(value: string) {
    return value.split('/')[2];
  }
}
