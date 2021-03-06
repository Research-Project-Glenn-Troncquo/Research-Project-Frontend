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
import { Facts } from 'src/app/interface/facts'

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
  posts: Post[] = []
  user: User = {}
  latestPost?: Post
  postsLoading: boolean = true
  postOverlay: boolean = false
  activePost?: Post
  likeOverlay: boolean = false
  followingLoading: boolean = false
  unfollowingLoading: boolean = false
  emojiOverlay: boolean = false
  facts: Facts[] = []
  textAreaValue: string = ''
  deletePostOverlay: boolean = false

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
    this.getFacts()
    console.log(this.route.snapshot.params['id'])
  }

  async getPosts() {
    this.httpService
      .Get('post', await this.authService.user.getIdToken())
      .subscribe((res) => {
        this.posts = res
        this.postsLoading = false
      })
  }

  async getPost() {
    this.httpService
      .Get('post/id', await this.authService.user.getIdToken())
      .subscribe((res) => {
        this.posts = res
      })
  }

  async getFacts() {
    this.httpService.Get('facts').subscribe((res) => {
      this.facts = res
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

  async handleComment(post: Post) {
    if (this.textAreaValue) {
      this.httpService
        ?.Post(
          'comment',
          { post_id: post.post_id, comment: this.textAreaValue },
          await this.authService.user.getIdToken()
        )
        .subscribe((res) => {
          post.comments?.push(res)
          this.textAreaValue = ''
        })
    }
  }

  async deletePost(post: any) {
    this.deletePostOverlay = false
    this.postOverlay = false
    this.httpService
      ?.delete(
        'post',
        { post_id: post.post_id },
        await this.authService.user.getIdToken()
      )
      .subscribe((res) => {
        this.posts = this.posts.filter(
          (currPost) => currPost.post_id !== post.post_id
        )

        this.dataService.deletePost(post)

        this.deletePostOverlay = false
        this.activePost = {}
        this.renderer.removeClass(document.body, 'overflow-hidden')
      })
  }

  addEmoji(event: any) {
    this.textAreaValue += event.emoji.native
  }

  handleEmojiOverlay() {
    this.emojiOverlay = !this.emojiOverlay
  }

  handleDeletePostOverlay(post: Post) {
    this.activePost = post
    this.deletePostOverlay = true
    this.renderer.addClass(document.body, 'overflow-hidden')
  }

  closeDeletePostOverlay() {
    if (this.postOverlay === false) this.activePost = {}
    this.deletePostOverlay = false
    if (this.postOverlay === false)
      this.renderer.removeClass(document.body, 'overflow-hidden')
  }

  handleProfileClick(user_id: string) {
    this.router.navigate([`profile/${user_id}`])
  }
  options: AnimationOptions = {
    path: './assets/beer.json',
  }
}
