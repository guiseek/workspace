import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AssetImage } from './../../shared/types/shared-types';

@Component({
  selector: 'seek-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss']
})
export class PhotosComponent {
  images$ = this.http.get<AssetImage[]>('assets/data/photos.json');
  constructor(private http: HttpClient) {}
}
