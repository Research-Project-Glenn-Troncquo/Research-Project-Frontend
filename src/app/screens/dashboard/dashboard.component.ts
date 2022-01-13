import { Component, OnInit } from '@angular/core'
import { AnimationOptions } from 'ngx-lottie'
import { AuthService } from 'src/app/auth/firebase.service'
import { HttpClient } from '@angular/common/http'
import { Post } from 'src/app/interface/post'
import { HttpService } from 'src/app/http/http.service'
import { User } from 'src/app/interface/user'
import { DataService } from 'src/app/data.service'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  posts?: Post[]
  user?: User
  latestPost?: Post

  constructor(
    public authService: AuthService,
    private httpService: HttpService,
    private dataService: DataService
  ) {
    this.dataService.currentUser.subscribe((user) => {
      console.log(user)
      this.user = user
    })
  }

  ngOnInit(): void {
    this.getPosts()
    // this.getUser()
  }

  async getPosts() {
    this.httpService
      .Get('post', await this.authService.user.getIdToken())
      .subscribe((res) => {
        this.posts = res
        this.latestPost = this.posts!.pop()
        console.log(this.posts)
        console.log(this.latestPost)
      })
  }

  async getUser() {
    this.httpService
      .Get('user', await this.authService.user.getIdToken())
      .subscribe((res) => {
        this.user = res
        console.log(this.user)
      })
  }

  handleSignOut() {
    console.log('helo')
    this.authService.signOut()
  }

  options: AnimationOptions = {
    path: './assets/beer.json', // download the JSON version of animation in your project directory and add the path to it like ./assets/animations/example.json
  }
}
