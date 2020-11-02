import {
  ControlValueAccessor,
  NgControl,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import {
  Component,
  ElementRef,
  forwardRef,
  HostBinding,
  AfterViewInit,
  Renderer2,
  Input,
  Optional,
  Self,
  Injectable,
  Output,
  EventEmitter,
} from '@angular/core';

@Injectable()
export class ControlAccessor implements ControlValueAccessor {
  protected _value: any;
  public get value(): any {
    return this._value;
  }
  @Input()
  @HostBinding('attr.value')
  public set value(value: any) {
    console.log('value: ', value);

    this._value = value;
  }

  protected _disabled: boolean;

  onChange = () => {};
  onTouched = () => {};

  writeValue(obj: any): void {
    this.value = obj;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this._disabled = isDisabled;
  }
}

const CheckboxProvider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => ControlAccessor),
  multi: true,
};

@Component({
  selector: 'label[ux-checkbox]',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  providers: [ControlAccessor, CheckboxProvider],
})
export class CheckboxComponent extends ControlAccessor
  implements AfterViewInit {
  static nextId = 0;

  private _id = `ux-checkbox-id-${CheckboxComponent.nextId++}`;
  public get id(): string {
    return this._id;
  }
  @Input()
  public set id(value: string) {
    this._id = value;
  }

  private _label: string;
  public get label(): string {
    return this._label;
  }
  @Input()
  public set label(value: string) {
    this._label = value;
  }

  private _checked: boolean;
  public get checked(): boolean {
    return this._checked || (!!this.value && this.value !== null);
  }
  @Input()
  public set checked(value: boolean) {
    this._checked = value;
  }

  public get disabled(): boolean {
    return this._disabled;
  }
  @Input()
  public set disabled(value: boolean) {
    this._disabled = value;
  }

  @HostBinding('class.paper-check') paperCheck = true;

  @HostBinding('for') labelFor = this.id;

  @Output() valueChange = new EventEmitter();
  @Output() checkedChange = new EventEmitter<HTMLInputElement>();

  constructor(
    private renderer: Renderer2,
    private elementRef: ElementRef<HTMLLabelElement>,
    @Optional() @Self() public ngControl: NgControl
  ) {
    super();
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  ngAfterViewInit(): void {
    const label = this.elementRef.nativeElement;
    const checkbox = label.querySelector('input');
    this.renderer.listen(checkbox, 'change', ({ target }) => {
      if (this.ngControl) {
        this.ngControl.control.setValue(target.checked);
        this.valueChange.emit(this.ngControl.value);
      }
      console.log(target.checked, target.value);
      this.checkedChange.emit(target);
    });
  }
}
