import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms'

export function forbiddenNameValidator(nameRe: RegExp): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const forbidden = nameRe.test(control.value)
    return forbidden ? null : { forbiddenName: { value: control.value } }
  }
}

export function passwordValidator(passwordRe: RegExp): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const forbidden = passwordRe.test(control.value)
    return forbidden ? null : { notValid: { value: control.value } }
  }
}
