import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {
  Component,
  ViewChild,
  AfterViewInit,
  ChangeDetectionStrategy,
} from '@angular/core';
import { AssetImage } from './../shared/types/shared-types';
import { ScullyRoutesService } from '@scullyio/ng-lib';
import { AutocompleteComponent } from '@nx-ux/paper';

export interface ScullyRoute {
  route: string;
  title?: string;
  slugs?: string[];
  published?: boolean;
  slug?: string;
  sourceFile?: string;
  lang?: string;
  [prop: string]: any;
}

@Component({
  selector: 'seek-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements AfterViewInit {
  @ViewChild('uxAutoCompleteStatic') uxAutocompleteStatic;
  @ViewChild('uxAutoCompleteApi') uxAutocompleteApi: AutocompleteComponent;

  images$ = this.http.get<AssetImage[]>('assets/data/photos.json');
  links$: Observable<ScullyRoute[]> = this.scully.available$;
  items = [];
  public isLoading: boolean;
  constructor(private http: HttpClient, private scully: ScullyRoutesService) {}

  ngAfterViewInit() {
    console.log(this.uxAutocompleteApi);
    console.log(this.uxAutocompleteStatic);

  }

  onChangeSearch(val: string) {
    //console.log('value', val);
    this.isLoading = true;
    this.scully.allRoutes$
      .pipe(
        map((posts) =>
          posts.filter((post) => {
            const query = post.title.trim().toLowerCase();
            const criteria = val.trim().toLowerCase();
            return query.indexOf(criteria) > -1;
          })
        )
      )
      .subscribe(
        (result) => {
          this.items = result;
          this.isLoading = false;
        },
        (err) => {
          console.log('err', err);
          this.isLoading = false;
        }
      );
    // this.service.getRepos(val).subscribe(
    //   (res) => {
    //     console.log('res', res);
    //     //this.items = this.items ? this.items.concat(res['items']) : res['items'];
    //     this.items = res['items'];
    //     this.isLoading = false;
    //   },
    //   (err) => {
    //     console.log('err', err);
    //     this.isLoading = false;
    //   }
    // );
  }
}
