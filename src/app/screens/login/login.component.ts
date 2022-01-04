import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormControl, FormGroup } from '@angular/forms'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    console.log('login component is called')
  }

  loginForm: FormGroup = this.formBuilder.group({
    // name: '',
    // lastname: '',
    email: '',
    password: '',
    firstName: new FormControl(),
  })

  onSubmit() {
    console.log(this.loginForm.value.email)
  }

  handleLogin() {
    console.log(this.loginForm.value.email)
  }
}
