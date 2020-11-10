import { Component, HostBinding, OnInit } from '@angular/core';

@Component({
  selector: '[ux-form-group]',
  templateUrl: './form-group.component.html',
  styles: [],
})
export class FormGroupComponent implements OnInit {
  @HostBinding('class.form-group') formGroup = true;
  constructor() {}

  ngOnInit(): void {}
}
