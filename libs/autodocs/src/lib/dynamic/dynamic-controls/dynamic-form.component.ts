// #docregion
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { ControlBase } from './control-base';
import { DynamicControlService } from './dynamic-control.service';

@Component({
  selector: 'autodocs-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  exportAs: 'dynamicForm',
  providers: [DynamicControlService],
})
export class DynamicFormComponent implements OnInit {
  @Input() controls: ControlBase<any>[] = [];

  @Input() form: FormGroup;

  payLoad = '';

  constructor(private dcs: DynamicControlService) {}

  ngOnInit() {
    console.log(this.form);

    if (!this.form) {
      this.form = this.dcs.toFormGroup(this.controls);
    }
  }

  onSubmit() {
    this.payLoad = JSON.stringify(this.form.value);
  }
}
