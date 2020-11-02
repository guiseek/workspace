import {
  AfterContentInit,
  Component,
  ContentChildren,
  HostBinding,
  Optional,
  QueryList,
  Self,
} from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { CheckboxComponent } from './checkbox.component';

@Component({
  selector: 'fieldset[ux-checkbox-group]',
  templateUrl: './checkbox-group.component.html',
  styles: [],
})
export class CheckboxGroupComponent implements AfterContentInit {
  @HostBinding('class.form-group') formGroup = true;

  @ContentChildren(CheckboxComponent) checkboxes: QueryList<CheckboxComponent>;

  constructor(@Optional() @Self() public ngControl: NgControl) {}

  ngAfterContentInit() {
    console.log('this.checkboxes: ', this.ngControl);
    console.log('this.checkboxes: ', this.checkboxes);
    this.checkboxes.map((checkbox) => {
      checkbox.checkedChange.subscribe(({ value, checked }) => {
        console.log(checked, value);
      });
    });
  }
}
