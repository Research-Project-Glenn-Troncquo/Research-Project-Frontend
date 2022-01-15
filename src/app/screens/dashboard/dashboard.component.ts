import { Component, OnInit } from '@angular/core'
import { AnimationOptions } from 'ngx-lottie'
import { AuthService } from 'src/app/auth/firebase.service'
import { HttpClient } from '@angular/common/http'
import { Post } from 'src/app/interface/post'
import { HttpService } from 'src/app/http/http.service'
import { User } from 'src/app/interface/user'
import { DataService } from 'src/app/data.service'
import { Renderer2 } from '@angular/core'
import { Location } from '@angular/common'
import { ActivatedRoute, Router } from '@angular/router'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  posts?: Post[]
  user: User = {}
  latestPost?: Post
  postOverlay: boolean = false
  activePost?: Post
  likeOverlay: boolean = false

  constructor(
    public authService: AuthService,
    private httpService: HttpService,
    private dataService: DataService,
    private renderer: Renderer2,
    public router: Router
  ) {
    this.router.navigate(['dashboard/idhello'])
    // this._route.params.subscribe((params) => {
    //   console.log(params)
    //   // console.log(this.route.snapshot.data)
    // })

    this.dataService.currentUser.subscribe((user) => {
      this.user = user

      // user.posts ? (this.latestPost = user.posts!.pop()) : null
    })

    this.dataService.latestPost.subscribe((post) => {
      this.latestPost = post
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
        // console.log(this.posts)
        // console.log(this.latestPost)
      })
  }

  async getUser() {
    this.httpService
      .Get('user', await this.authService.user.getIdToken())
      .subscribe((res) => {
        this.user = res
      })
  }

  handleSignOut() {
    this.authService.signOut()
  }
  closePostOverlay() {
    this.activePost = {}
    this.postOverlay = false
  }

  closeLikesOverlay() {
    if (this.postOverlay === false) this.activePost = {}
    this.likeOverlay = false
  }

  handlePostOverlay(post: Post) {
    this.activePost = post
    this.postOverlay = true
  }
  handleLikesOverlay(post: Post) {
    this.activePost = post
    this.likeOverlay = true
  }

  testFunction(user: User): boolean {
    const filteredArr = this.user.isfollowing?.filter((follow) => {
      return follow.isfollowing_id === user.user_id
    })
    console.log(filteredArr)

    if (filteredArr!.length > 0) return true
    return false
  }
  options: AnimationOptions = {
    path: './assets/beer.json', // download the JSON version of animation in your project directory and add the path to it like ./assets/animations/example.json
  }
}
