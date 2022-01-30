import { Component, OnInit, Renderer2 } from '@angular/core'
import { HttpService } from 'src/app/http/http.service'
import { User } from 'src/app/interface/user'
import { DataService } from 'src/app/data.service'
import { AuthService } from 'src/app/auth/firebase.service'
import { Post } from 'src/app/interface/post'
import { ActivatedRoute, Router } from '@angular/router'
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
  postsLoading: boolean = true
  postOverlay: boolean = false
  activePost?: Post
  likeOverlay: boolean = false
  deletePostOverlay: boolean = false
  emojiOverlay: boolean = false
  followers: any = { followings: [], followers: [] }

  constructor(
    private httpService: HttpService,
    private dataService: DataService,
    public authService: AuthService,
    private route: ActivatedRoute,
    private firebaseService: AuthService,
    private renderer: Renderer2,
    public router: Router
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
    // this.getFollowings()
    this.getFollowers()
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

      const url = await this.firebaseService.fileUpload(
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

  handleDeletePostOverlay(post: Post) {
    this.activePost = post
    this.deletePostOverlay = true
    this.renderer.addClass(document.body, 'overflow-hidden')
  }
  closePostOverlay() {
    this.activePost = {}
    this.postOverlay = false
    this.emojiOverlay = false
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
  closeDeletePostOverlay() {
    if (this.postOverlay === false) this.activePost = {}
    this.deletePostOverlay = false
    if (this.postOverlay === false)
      this.renderer.removeClass(document.body, 'overflow-hidden')
  }

  handlePostOverlay(post?: Post) {
    if (post) {
      this.activePost = post
      this.userSelf.user_id === this.user.user_id
        ? (this.activePost.user = this.userSelf)
        : (this.activePost.user = this.user)
      this.postOverlay = true

      this.renderer.addClass(document.body, 'overflow-hidden')
    } else {
      this.renderer.addClass(document.body, 'overflow-hidden')
    }
  }

  async getFollowers() {
    this.httpService
      .Get('user/followers', await this.firebaseService.user.getIdToken())
      .subscribe((res) => {
        this.followers = res
        console.log(this.followers.followings.length)
      })
  }

  handleProfileClick(user_id: string) {
    this.router.navigate([`profile/${user_id}`])
  }
}
