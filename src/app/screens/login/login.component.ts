import {
  animate,
  keyframes,
  style,
  transition,
  trigger,
} from '@angular/animations'
import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { User } from 'src/app/interface/user'
import { AuthService } from 'src/app/auth/auth.service'
import {
  forbiddenNameValidator,
  passwordValidator,
} from '../../services/validator.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  animations: [
    trigger('slideIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(-30px)' }),
        animate('300ms', style({ opacity: 1, transform: 'translateX(0px)' })),
      ]),
      transition(':leave', [animate('300ms', style({ opacity: 0 }))]),
    ]),
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [animate('300ms', style({ opacity: 0 }))]),
    ]),
    trigger('bounceIn', [
      transition(':enter', [
        animate(
          '0.3s',
          keyframes([
            style({ transform: 'scale(0) ' }),
            style({ transform: 'scale(2) ' }),
            style({ transform: 'scale(1) ' }),
          ])
        ),
      ]),
      transition(':leave', [animate('300ms', style({ opacity: 0 }))]),
    ]),
  ],
})
export class LoginComponent implements OnInit {
  loading: boolean = false
  errorMsg: string = ''
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    public router: Router
  ) {}

  ngOnInit(): void {}

  loginForm: FormGroup = this.formBuilder.group({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  })

  get email() {
    return this.loginForm.get('email')
  }
  get password() {
    return this.loginForm.get('password')
  }

  async onSubmit() {
    if (this.loginForm.valid) {
      this.loading = true

      const res: any = await this.authService.login(
        this.email!.value,
        this.password!.value
      )

      let indexOf: string | null = null
      let errorMsg: string = ''

      res.code ? (indexOf = res.code.indexOf('/')) : null
      indexOf ? (errorMsg = res.code.slice(indexOf + 1)) : null

      res === true
        ? this.router.navigate(['dashboard'])
        : (this.errorMsg = errorMsg)
      this.loading = false
    } else this.validateAllFormFields(this.loginForm)
  }

  handleErrorEmit(event: any) {
    this.loginForm.controls[event].markAsUntouched()
    this.loginForm.controls[event].markAsPristine()
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
}
