import { Component, forwardRef, Input } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormGroup,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator
} from '@angular/forms';

@Component({
  selector: 'app-input-duration',
  templateUrl: './input-duration.component.html',
  styleUrls: ['./input-duration.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputDurationComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => InputDurationComponent),
      multi: true
    }
  ]
})
export class InputDurationComponent implements ControlValueAccessor, Validator {

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

  public validate(control: AbstractControl): ValidationErrors | null {
    return Number.isNaN(Number(control.value)) ? { appDuration: true } : null;
  }
}
