import { Component, forwardRef, Input } from '@angular/core';
import {
  AbstractControl,
  FormGroup,
  Validator,
  ControlValueAccessor,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR
} from '@angular/forms';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatePickerComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => DatePickerComponent),
      multi: true
    }
  ]
})
export class DatePickerComponent implements Validator, ControlValueAccessor {

  @Input() public parent: FormGroup;
  constructor() {}

  public onChange: (val: string) => unknown;
  public onTouched: (val: string) => unknown;

  public writeValue(): void {}

  public registerOnChange(fn: (val: string) => unknown): void {
    this.onChange = fn;
  }
  public registerOnTouched(fn: (val: string) => unknown): void {
    this.onTouched = fn;
  }

  public validate(control: AbstractControl): {[key: string]: boolean} | null {
    if (!(/\d{2}\/\d{2}\/\d{4}$/g).test(control.value)) {
      return { dateIsInvalid: true };
    }
    return null;
  }
}
