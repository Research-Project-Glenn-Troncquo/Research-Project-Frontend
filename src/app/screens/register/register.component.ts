import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormControl, FormGroup } from '@angular/forms'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit {
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    console.log('register component is called')
  }

  registerForm: FormGroup = this.formBuilder.group({
    name: '',
    lastname: '',
    email: '',
    password: '',
    confirmpassword: '',
  })

  onSubmit() {
    console.log(this.registerForm.value.email)
  }
}
