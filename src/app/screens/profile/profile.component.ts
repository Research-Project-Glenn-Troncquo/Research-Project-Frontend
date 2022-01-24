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
  constructor(
    private httpService: HttpService,
    private dataService: DataService,
    public authService: AuthService,
    private route: ActivatedRoute
  ) {
    this.dataService.currentUser.subscribe((user) => {
      this.userSelf = user
    })
    this.user_id = this.route.snapshot.params['id']
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
}
