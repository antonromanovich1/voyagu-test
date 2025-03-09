import { inject, Injectable } from '@angular/core';
import { FormBuilder, NonNullableFormBuilder, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class TravellerFormService {
  private fb = inject(FormBuilder);

  public readonly form = this.fb.group(
    {
      name: [null, [Validators.required]],
      lastname: [null, [Validators.required]],
      gender: [null, [Validators.required]],
      month: [null, [Validators.required]],
      day: [null, [Validators.required]],
      year: [null, [Validators.required]],
      citizenship: [null, [Validators.required]],
    },
    { updateOn: 'blur' },
  );
}
