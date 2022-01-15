import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { AuthService } from 'src/app/auth/firebase.service'
import { HttpService } from 'src/app/http/http.service'
import { Post } from 'src/app/interface/post'

@Component({
  selector: 'app-addpost',
  templateUrl: './addpost.component.html',
  styleUrls: ['./addpost.component.scss'],
})
export class AddpostComponent implements OnInit {
  loading: boolean = false
  fileData: any
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private firebaseSerive: AuthService,
    private httpService: HttpService
  ) {}

  ngOnInit(): void {}

  postForm: FormGroup = this.formBuilder.group({
    title: new FormControl('', [Validators.required, Validators.minLength(1)]),
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
    ]),
    file: new FormControl('', [Validators.required]),
  })

  get title() {
    return this.postForm.get('title')
  }
  get description() {
    return this.postForm.get('description')
  }
  get file() {
    return this.postForm.get('file')
  }

  get fileName() {
    return this.file?.value.toString().replace(`C:\\fakepath\\`, '')
  }

  onFileSelected(event: any) {
    this.fileData = event.target.files[0]
  }

  handleErrorEmit(event: any) {
    this.postForm.controls[event].markAsUntouched()
    this.postForm.controls[event].markAsPristine()
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

  async onSubmit() {
    if (this.postForm.valid) {
      console.log(this.fileName?.value)
      this.loading = true

      // const res = await this.authService.register(user)

      // res.errorMsg
      //   ? (this.errorMsg = res.errorMsg)
      //   : await this.authService.loginId(res.token)

      console.log(this.fileData)
      console.log(this.file?.value)

      const url = await this.firebaseSerive.fileUpload(this.fileData, `post-pictures`)

      console.log(url)

      const post: Post = {
        title: this.title!.value,
        description: this.description!.value,
        img_url: url,
      }

      const test = await this.httpService.post(
        'post',
        post,
        await this.firebaseSerive.user.getIdToken()
      )
      console.log(test)

      this.loading = false

      // this.router.navigate(['dashboard'])
    } else this.validateAllFormFields(this.postForm)
  }
}
