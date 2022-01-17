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
import { ActivatedRoute, Route, Router } from '@angular/router'
import { animate, style, transition, trigger } from '@angular/animations'
import { IsFollowing } from 'src/app/interface/isfollowing'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('150ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [animate('150ms', style({ opacity: 0 }))]),
    ]),

    trigger('fadeUp', [
      transition(':enter', [
        style({ opacity: 0, top: '0px' }),
        animate('150ms', style({ opacity: 1, top: '10px' })),
      ]),
      transition(':leave', [animate('50ms', style({ opacity: 0 }))]),
    ]),
  ],
})
export class DashboardComponent implements OnInit {
  posts?: Post[]
  user: User = {}
  latestPost?: Post
  postOverlay: boolean = false
  activePost?: Post
  likeOverlay: boolean = false
  followingLoading: boolean = false
  unfollowingLoading: boolean = false
  emojiOverlay: boolean = false

  constructor(
    public authService: AuthService,
    private httpService: HttpService,
    private dataService: DataService,
    private renderer: Renderer2,
    public router: Router,
    private location: Location,
    private route: ActivatedRoute
  ) {
    this.dataService.currentUser.subscribe((user) => {
      this.user = user
    })

    this.dataService.latestPost.subscribe((post) => {
      this.latestPost = post
    })
  }

  ngOnInit(): void {
    this.getPosts()
    console.log(this.route.snapshot.params['id'])
  }

  async getPosts() {
    this.httpService
      .Get('post', await this.authService.user.getIdToken())
      .subscribe((res) => {
        this.posts = res
      })
  }

  async getPost() {
    this.httpService
      .Get('post/id', await this.authService.user.getIdToken())
      .subscribe((res) => {
        this.posts = res
      })
  }

  async getUser() {
    this.httpService
      .Get('user', await this.authService.user.getIdToken())
      .subscribe((res) => {
        this.user = res
      })
  }

  handlePostOverlay(post?: Post) {
    if (post) {
      this.activePost = post
      this.postOverlay = true

      this.location.replaceState(`/dashboard/${post.post_id}`)
      this.renderer.addClass(document.body, 'overflow-hidden')
    } else {
      this.latestPost!.user = this.user
      this.activePost = this.latestPost
      this.postOverlay = true

      this.location.replaceState(`/dashboard/${this.latestPost!.post_id}`)
      this.renderer.addClass(document.body, 'overflow-hidden')
    }
  }
  closePostOverlay() {
    this.activePost = {}
    this.postOverlay = false
    this.emojiOverlay = false
    this.location.replaceState(`/dashboard`)
    this.renderer.removeClass(document.body, 'overflow-hidden')
  }
  handleLikesOverlay(post: Post) {
    this.activePost = post
    this.likeOverlay = true
    this.renderer.addClass(document.body, 'overflow-hidden')
  }
  closeLikesOverlay() {
    if (this.postOverlay === false) this.activePost = {}
    this.likeOverlay = false
    if (this.postOverlay === false)
      this.renderer.removeClass(document.body, 'overflow-hidden')
  }

  testFunction(user: User): boolean {
    const filteredArr = this.user.isfollowing?.filter((follow) => {
      return follow.isfollowing_id === user.user_id
    })

    if (filteredArr!.length > 0) return true
    return false
  }

  async followUser(user: User) {
    this.followingLoading = true
    this.httpService
      .Post(
        'isfollowing',
        { isfollowing_id: user.user_id },
        await this.authService.user.getIdToken()
      )
      .subscribe((res: IsFollowing) => {
        const isfollowing: IsFollowing = {
          isfollowing_id: res.isfollowing_id,
          user_id: res.user_id,
        }
        this.user.isfollowing?.push(isfollowing)

        this.followingLoading = false
      })
  }
  async unfollowUser(user: User) {
    this.unfollowingLoading = true
    this.httpService
      .delete(
        'isfollowing',
        { isfollowing_id: user.user_id },
        await this.authService.user.getIdToken()
      )
      .subscribe((res) => {
        const isfollowing = this.user.isfollowing?.filter(
          (isfollowing) => user.user_id !== isfollowing.isfollowing_id
        )
        this.user.isfollowing = isfollowing

        this.unfollowingLoading = false
      })
  }

  async deleteComment(comment: any) {
    this.httpService
      ?.delete('comment', comment, await this.authService.user.getIdToken())
      .subscribe((res) => {
        const indexOfComment = this.activePost?.comments?.indexOf(comment)
        this.activePost?.comments?.splice(indexOfComment!, 1)
      })
  }

  handleComment() {}

  addEmoji(event: any) {
    console.log(event)
  }

  handleEmojiOverlay() {
    console.log('clik')
    this.emojiOverlay = !this.emojiOverlay
  }
  options: AnimationOptions = {
    path: './assets/beer.json',
  }
}
