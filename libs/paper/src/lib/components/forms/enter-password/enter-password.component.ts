import {
  Component,
  HostBinding,
  Input,
  OnInit,
  Optional,
  Self,
} from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

@Component({
  selector: 'ux-enter-password',
  templateUrl: './enter-password.component.html',
  styleUrls: ['./enter-password.component.scss'],
})
export class EnterPasswordComponent implements OnInit, ControlValueAccessor {
  @Input() disabled: boolean;
  @Input() label: string;
  @Input() placeholder = '';

  value: any = '';

  private _length = 4;
  @Input() set length(length: number) {
    this._length = length;
  }
  @HostBinding('style') get nChar() {
    return `--n-char: ${this.length}`;
  }
  get length() {
    return this._length;
  }

  constructor(
    @Self()
    @Optional()
    private ngControl: NgControl
  ) {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  ngOnInit(): void {
    // this.ngControl.statusChanges.subscribe(console.log);
    // this.ngControl.valueChanges.subscribe(console.log);
  }

  /**
   * Grave o valor do formulário no elemento DOM (modelo => visualização)
   * en-US: _Write form value to the DOM element (model => view)_
   */
  writeValue(value: any): void {
    this.value = value;
  }

  /**
   * Grave o estado desativado do formulário no elemento DOM (modelo => visualização)
   * en-US: _Write form disabled state to the DOM element (model => view)_
   */
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  /**
   * Atualize o formulário quando o valor do elemento DOM muda (visualização => modelo)
   * en-US: _Update form when DOM element value changes (view => model)_
   */
  registerOnChange(fn: any): void {
    // Armazene a função fornecida como um método interno.
    // en-US: _Store the provided function as an internal method._
    this.onChange = fn;
  }

  /**
   * Update form when DOM element is blurred (view => model)
   */
  registerOnTouched(fn: any): void {
    // Armazene a função fornecida como um método interno.
    // en-US: _Store the provided function as an internal method._
    this.onTouched = fn;
  }

  onChange(value: any) {}
  onTouched() {}
}
