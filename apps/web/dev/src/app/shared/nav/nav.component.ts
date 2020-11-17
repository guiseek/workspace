import { NavItem } from './../types/shared-types';
import { Component, HostBinding, Input, OnInit } from '@angular/core';

@Component({
  selector: 'nav[seek-nav], nav[nav-left], nav[nav-right]',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  @Input() location: Location;

  @Input() nav: NavItem[];

  @Input()
  @HostBinding('class.secondary')
  secondary = false;

  constructor() {}

  ngOnInit(): void {}
}
