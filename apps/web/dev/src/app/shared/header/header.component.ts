import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'seek-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() location: Location = location;

  constructor() {
    console.log(this.location.pathname);
  }

  ngOnInit(): void {}
}
