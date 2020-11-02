import { Component, HostBinding, OnInit } from '@angular/core';

@Component({
  selector: 'fieldset[ux-checkbox-group]',
  templateUrl: './checkbox-group.component.html',
  styles: [],
})
export class CheckboxGroupComponent implements OnInit {
  @HostBinding('class.form-group') formGroup = true;

  constructor() {}

  ngOnInit(): void {}
}
