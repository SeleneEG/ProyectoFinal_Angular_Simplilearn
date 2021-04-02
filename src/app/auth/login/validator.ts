import {
  AbstractControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';

export function passwordMatchValidator(): ValidatorFn {
  return (form: FormGroup): ValidationErrors | null => {
    const password = form.controls['password'].value;
    const password_confirm = form.controls['confirmPassword'].value;
    if (password && password_confirm) {
      if (password !== password_confirm) {
        return { mismatchPassword: true };
      }
    }

    return null;
  };
}
