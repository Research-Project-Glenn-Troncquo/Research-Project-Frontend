import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { AuthService } from 'src/app/auth/firebase.service'
import { DataService } from 'src/app/data.service'
import { HttpService } from 'src/app/http/http.service'
import { User } from 'src/app/interface/user'
import { forbiddenNameValidator } from 'src/app/services/validator.service'

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  user: User = {}
  profilePicture: any
  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private firebaseService: AuthService,
    private httpService: HttpService
  ) {
    this.dataService.currentUser.subscribe((user) => {
      this.user = user
      console.log(this.user)
    })
  }

  ngOnInit(): void {}

  settingsForm: FormGroup = this.formBuilder.group({
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
  })

  get name() {
    return this.settingsForm.get('name')
  }
  get lastname() {
    return this.settingsForm.get('lastname')
  }
  get username() {
    return this.settingsForm.get('username')
  }
  get email() {
    return this.settingsForm.get('email')
  }

  handleErrorEmit(event: any) {
    this.settingsForm.controls[event].markAsUntouched()
    this.settingsForm.controls[event].markAsPristine()
  }

  async handleProfilePicture(picture: any) {
    try {
      const htmlInput = picture.currentTarget as HTMLInputElement
      const fileData = htmlInput.files![0]

      const url = await this.firebaseService.fileUpload(
        fileData,
        `profile-pictures`
      )

      const user: User = {
        name: this.user.name,
        lastname: this.user.lastname,
        username: this.user.username,
        email: this.user.email,
        img_url: url,
      }

      this.httpService
        .Post(
          'user/profile',
          user,
          await this.firebaseService.user.getIdToken()
        )
        .subscribe((res: User) => {
          this.user.img_url = res.img_url
        })
    } catch (error) {}
  }
}
