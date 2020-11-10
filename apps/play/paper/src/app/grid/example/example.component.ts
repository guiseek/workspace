import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface AssetImage {
  title: string;
  src: string;
}

@Component({
  selector: 'guiseek-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.scss'],
})
export class ExampleComponent implements OnInit {
  images$: Observable<AssetImage[]>;
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.images$ = this.http.get<AssetImage[]>('assets/data/images.json').pipe(
      map((images) =>
        images.map(({ src, title }) => ({
          src: `assets/images/${src}`,
          title,
        }))
      )
    );

    this.images$.subscribe((data) => console.log(data));
  }
}
