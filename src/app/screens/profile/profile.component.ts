import { Component, OnInit } from '@angular/core'
import { HttpService } from 'src/app/http/http.service'
import { User } from 'src/app/interface/user'
import { DataService } from 'src/app/data.service'
import { AuthService } from 'src/app/auth/firebase.service'
import { Post } from 'src/app/interface/post'
import { ActivatedRoute } from '@angular/router'
import { IsFollowing } from 'src/app/interface/isfollowing'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  user: User = {}
  userSelf: User = {}
  posts: Post[] = []
  user_id: string = ''
  userFound: boolean = false
  randomUsers: User[] = []
  userLoaded: boolean = false
  profilePicture: any
  constructor(
    private httpService: HttpService,
    private dataService: DataService,
    public authService: AuthService,
    private route: ActivatedRoute,
    private firebaseSerive: AuthService
  ) {
    this.dataService.currentUser.subscribe((user) => {
      this.userSelf = user
    })
    this.user_id = this.route.snapshot.params['id']

    this.route.params.subscribe((param) => {
      this.user_id = this.route.snapshot.params['id']
      this.ngOnInit()
    })
  }

  get sameUser() {
    return this.user.user_id === this.userSelf.user_id
  }

  ngOnInit(): void {
    this.getUser()
    this.getFollowings()
  }

  async getUser() {
    const res = await this.httpService?.post(
      `user/one/${this.user_id}`,
      { user_id: this.user_id },
      await this.authService.user.getIdToken()
    )

    if (res.message) {
      //go to home
      return
    }

    this.user = res
    this.posts = this.user.posts!
    this.userLoaded = true
  }

  async getFollowings() {
    this.httpService
      .Get('user/followings', await this.authService.user.getIdToken())
      .subscribe((res) => {
        console.log(res)
      })
  }

  newFollower(newFollower: IsFollowing) {
    this.user.followers?.push(newFollower.user_id!)
  }

  removeFollower(newFollowers: IsFollowing[]) {
    this.user.followers?.pop()
  }

  async handleProfilePicture(picture: any) {
    try {
      const htmlInput = picture.currentTarget as HTMLInputElement
      const fileData = htmlInput.files![0]

      const url = await this.firebaseSerive.fileUpload(
        fileData,
        `profile-pictures`
      )

      const user: User = {
        name: this.userSelf.name,
        lastname: this.userSelf.lastname,
        username: this.userSelf.username,
        email: this.userSelf.email,
        img_url: url,
      }

      this.httpService
        .Post('user/profile', user, await this.authService.user.getIdToken())
        .subscribe((res: User) => {
          this.user.img_url = res.img_url
        })
    } catch (error) {}
  }

  async onSubmit() {
    // const url = await this.firebaseSerive.fileUpload(
    //   this.fileData,
    //   `post-pictures`
    // )
    // const post: Post = {
    //   title: this.title!.value,
    //   description: this.description!.value,
    //   img_url: url,
    // }
    // const test = await this.httpService.post(
    //   'post',
    //   post,
    //   await this.firebaseSerive.user.getIdToken()
    // )
    // console.log(test)
    // this.user.posts?.push(test)
  }
}
