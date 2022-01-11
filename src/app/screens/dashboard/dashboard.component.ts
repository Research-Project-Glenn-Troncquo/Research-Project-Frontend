import { Component, OnInit } from '@angular/core'
import { AnimationOptions } from 'ngx-lottie'
import { AuthService } from 'src/app/auth/firebase.service'
import { HttpClient } from '@angular/common/http'
import { Post } from 'src/app/interface/post'
import { HttpService } from 'src/app/http/http.service'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  posts: any
  constructor(
    public authService: AuthService,
    private httpService: HttpService
  ) {}

  ngOnInit(): void {
    this.getPosts()
  }

  async getPosts() {
    this.httpService
      .Get('post', await this.authService.user.getIdToken())
      .subscribe((res) => {
        this.posts = res
        console.log(this.posts)
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
