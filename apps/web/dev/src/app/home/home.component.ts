import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AssetImage } from './../shared/types/shared-types';

@Component({
  selector: 'guiseek-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  images$ = this.http.get<AssetImage[]>('assets/data/photos.json');
  constructor(private http: HttpClient) {}
}
