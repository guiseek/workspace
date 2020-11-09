import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

export interface AssetImage {
  title: string;
  src: string;
}

@Component({
  selector: 'guiseek-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  images$ = this.http.get<AssetImage[]>('assets/data/photos.json');
  constructor(private http: HttpClient) {}

  ngOnInit(): void {}
}
