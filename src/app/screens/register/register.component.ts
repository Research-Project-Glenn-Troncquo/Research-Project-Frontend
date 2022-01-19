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
import { AuthService } from 'src/app/auth/firebase.service'
import {
  forbiddenNameValidator,
  passwordValidator,
} from '../../services/validator.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
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
      transition(':leave', [animate('0ms', style({ opacity: 0 }))]),
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
export class RegisterComponent implements OnInit {
  loading: boolean = false
  errorMsg: string = ''
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  registerForm: FormGroup = this.formBuilder.group({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      forbiddenNameValidator(/^[a-z ,.'-]+$/i),
    ]),
    lastname: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      forbiddenNameValidator(/^[a-z ,.'-]+$/i),
    ]),
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      passwordValidator(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#@$!%*?&-])[A-Za-z\d@#$!%*?&-]{8,}$/
      ),
    ]),
    confirmpassword: new FormControl('', [Validators.required]),
  })

  get name() {
    return this.registerForm.get('name')
  }
  get lastname() {
    return this.registerForm.get('lastname')
  }
  get username() {
    return this.registerForm.get('username')
  }
  get email() {
    return this.registerForm.get('email')
  }
  get password() {
    return this.registerForm.get('password')
  }
  get confirmpassword() {
    return this.registerForm.get('confirmpassword')
  }

  async onSubmit() {
    if (
      this.registerForm.valid &&
      this.password!.value === this.confirmpassword!.value
    ) {
      this.loading = true
      const user: User = {
        name: this.name!.value,
        lastname: this.lastname!.value,
        email: this.email!.value,
        password: this.password!.value,
        username: this.username!.value,
      }
      const res = await this.authService.register(user)

      if (!res.errorMsg) {
        await this.authService.loginId(res.token)
        this.router.navigate(['dashboard'])
      } else this.errorMsg = res.errorMsg

      this.loading = false
    } else this.validateAllFormFields(this.registerForm)
  }

  handleErrorEmit(event: any) {
    this.registerForm.controls[event].markAsUntouched()
    this.registerForm.controls[event].markAsPristine()
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
