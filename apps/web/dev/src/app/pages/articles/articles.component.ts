import { HttpClient } from '@angular/common/http';
import { Component, Injectable, ViewChild } from '@angular/core';

@Injectable()
export class DataService {
  constructor(private _http: HttpClient) {}

  getRepos(value: string) {
    return this._http.get(
      `https://api.github.com/search/repositories?q=${value}&sort=stars&order=desc&limit=10`
    );
  }
}

@Component({
  selector: 'seek-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss'],
  providers: [DataService],
})
export class ArticlesComponent {
  public countries = [
    'Albania',
    'Andorra',
    'Armenia',
    'Austria',
    'Azerbaijan',
    'Belarus',
    'Belgium',
  ];

  public test = [
    'Lithuania',
    'Luxembourg',
    'Macedonia',
    'Malta',
    'Moldova',
    'Monaco',
    'Montenegro',
    'Netherlands',
    'Norway',
    'Poland',
    'Portugal',
    'Romania',
    'Russia',
    'San Marino',
    'Serbia',
    'Slovakia',
    'Slovenia',
    'Spain',
    'Sweden',
    'Switzerland',
    'Turkey',
    'Ukraine',
    'United Kingdom',
    'Vatican City',
  ];

  @ViewChild('ngAutoCompleteStatic') ngAutocompleteStatic;
  @ViewChild('ngAutoCompleteApi') ngAutocompleteApi;
  items = [];
  public placeholder = 'Enter the Country Name';
  public keyword = 'name';
  public historyHeading = 'Recently selected';
  public isLoading: boolean;
  initialValue = {
    id: 9,
    name: 'Georgia',
    population: 200,
  };
  gitRepos$ = this.service.getRepos('guiseek');
  constructor(private service: DataService) {}

  onChangeSearch(val: string) {
    //console.log('value', val);
    this.isLoading = true;
    this.service.getRepos(val).subscribe(
      (res) => {
        console.log('res', res);
        //this.items = this.items ? this.items.concat(res['items']) : res['items'];
        this.items = res['items'];
        this.isLoading = false;
      },
      (err) => {
        console.log('err', err);
        this.isLoading = false;
      }
    );
  }

  selectEvent(item) {
    console.log('Selected item', item);
  }

  /**
   * Static
   */

  changeEventStatic(string: string) {
    console.log('string', string);
  }

  focusEventStatic(e) {
    console.log('focused', e);
    //this.ngAutocompleteStatic.close();
  }

  clearEventStatic() {
    console.log('cleared');
    //this.ngAutocompleteStatic.close();
  }

  scrollToEndStatic() {
    console.log('scrolled-to-bottom');
    this.countries = [...this.countries, ...this.test];
    //console.log('countriesssss', this.countries);
  }

  openedStatic() {
    console.log('opened');
  }

  closedStatic() {
    console.log('closed');
  }

  openStaticPanel(e): void {
    console.log('open');
    e.stopPropagation();
    this.ngAutocompleteStatic.open();
  }

  closeStaticPanel(e): void {
    console.log('close');
    e.stopPropagation();
    this.ngAutocompleteStatic.close();
  }

  focusStaticPanel(e): void {
    console.log('focus');
    e.stopPropagation();
    this.ngAutocompleteStatic.focus();
  }

  clearStatic(e): void {
    console.log('clear');
    e.stopPropagation();
    this.ngAutocompleteStatic.clear();
  }

  clearAndCloseStatic() {
    this.ngAutocompleteStatic.close();
    this.ngAutocompleteStatic.clear();
  }

  /**
   * End of Static
   */

  /**
   * API
   */

  focusedEventApi(e) {
    console.log('focused');
    // Fetch API data on Load
    this.onChangeSearch(null);
  }

  openedEventApi() {
    console.log('opened');
  }

  closedEventApi() {
    console.log('closed');
  }

  clearEventApi() {
    console.log('cleared');
  }

  scrollToEndApi() {
    this.onChangeSearch('w');
  }

  openApiPanel(e): void {
    console.log('open');
    e.stopPropagation();
    this.ngAutocompleteApi.open();
  }

  closeApiPanel(e): void {
    console.log('close');
    e.stopPropagation();
    this.ngAutocompleteApi.close();
  }

  focusApiPanel(e): void {
    console.log('focus');
    e.stopPropagation();
    this.ngAutocompleteApi.focus();
  }
}
