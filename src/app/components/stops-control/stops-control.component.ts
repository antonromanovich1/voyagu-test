import { AsyncPipe } from '@angular/common';
import { Component, effect, forwardRef, inject, input } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormArray,
  FormsModule,
  NG_VALUE_ACCESSOR,
  NonNullableFormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { map, tap } from 'rxjs';

@Component({
  selector: 'app-stops-control',
  imports: [CheckboxModule, ReactiveFormsModule, FormsModule, AsyncPipe],
  templateUrl: './stops-control.component.html',
  styleUrl: './stops-control.component.scss',
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => StopsControlComponent), multi: true }],
})
export class StopsControlComponent implements ControlValueAccessor {
  options = input.required<number[]>();

  private fb = inject(NonNullableFormBuilder);

  readonly form = this.fb.group({
    stops: this.fb.array([]),
  });

  protected readonly allToggle$ = this.stopsControlArray.valueChanges.pipe(
    tap((stops) => this.onChange(this.formatValue(stops))),
    map((stops) => stops.every((stop: boolean) => stop)),
  );

  get stopsControlArray(): FormArray {
    return this.form.get('stops') as FormArray;
  }

  optionsChangeEffect = effect(() => {
    this.options()?.forEach((_, idx) => this.stopsControlArray.push(this.fb.control(idx === 0 ? true : false)));
    this.stopsControlArray.setValidators(this.noNullSelectionValidator.bind(this));
  });

  onAllToggleChange(value: boolean) {
    if (value) {
      this.stopsControlArray.controls.forEach((stop) => stop.setValue(true));
      this.onChange(this.formatValue(this.stopsControlArray.value));
    }
    if (!value && this.stopsControlArray.value.every((stop: boolean) => stop)) {
    }
  }

  private formatValue(value: number[]) {
    return value.reduce((acc, curr, idx: number) => {
      curr && acc.push(this.options()[idx]?.toString());
      return acc;
    }, [] as string[]);
  }

  private noNullSelectionValidator(control: AbstractControl) {
    if (control.value.length && control.value.length === this.options().length) {
      control.value.every((stop: boolean) => !stop) && (control as FormArray).controls[0].setValue(true);
    }
    return null;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  onChange = (value: any) => {};
  onTouched = () => {};
  writeValue(obj: any): void {
    if (obj.length) {
      this.stopsControlArray.controls[0]?.setValue(true);
    }
  }
}
