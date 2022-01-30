import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { AuthService } from 'src/app/auth/firebase.service'

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss'],
})
export class PasswordComponent implements OnInit {
  loading: boolean = false
  constructor(
    private formBuilder: FormBuilder,
    private firebaseService: AuthService
  ) {}

  ngOnInit(): void {}

  forgotPasswordForm: FormGroup = this.formBuilder.group({
    email: new FormControl('', [Validators.required]),
  })

  get email() {
    return this.forgotPasswordForm.get('email')
  }

  handleErrorEmit(event: any) {
    this.forgotPasswordForm.controls[event].markAsUntouched()
    this.forgotPasswordForm.controls[event].markAsPristine()
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((field) => {
      const control = formGroup.get(field) //{3}
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true })
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control) //{6}
      }
    })
  }

  async handlePasswordReset() {
    if (this.forgotPasswordForm.valid) {
      this.loading = true

      const res = await this.firebaseService.resetPassword(this.email!.value)

      this.loading = false
    } else this.validateAllFormFields(this.forgotPasswordForm)
  }
}
