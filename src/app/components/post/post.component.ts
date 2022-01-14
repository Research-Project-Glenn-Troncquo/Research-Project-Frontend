import { Component, Input, OnInit } from '@angular/core'
import { Post } from 'src/app/interface/post'
import { User } from 'src/app/interface/user'
import { Renderer2 } from '@angular/core'
import { DataService } from 'src/app/data.service'
import { HttpService } from 'src/app/http/http.service'
import { AuthService } from 'src/app/auth/firebase.service'
import {
  animate,
  keyframes,
  style,
  transition,
  trigger,
} from '@angular/animations'

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
  animations: [
    trigger('bounceIn', [
      transition('false <=> true', [
        animate(
          '0.3s',
          keyframes([
            style({ transform: 'scale(0) ' }),
            style({ transform: 'scale(1.5) ' }),
            style({ transform: 'scale(1) ' }),
          ])
        ),
      ]),
      transition('true <=> false', [
        animate(
          '0.3s',
          keyframes([
            style({ transform: 'scale(0) ' }),
            style({ transform: 'scale(1.5) ' }),
            style({ transform: 'scale(1) ' }),
          ])
        ),
      ]),
    ]),
  ],
})
export class PostComponent implements OnInit {
  @Input() post!: Post
  @Input() user!: User
  loggedInUser: User = {}
  showOverlay: boolean = false
  animationState: boolean = false

  get postLiked() {
    let liked = null
    for (const like of this.post.likes!) {
      if (like.user_id === this.loggedInUser.user_id) {
        liked = like
      }
    }
    return liked
  }

  constructor(
    private renderer: Renderer2,
    private dataService: DataService,
    private httpService: HttpService,
    private firebaseService: AuthService
  ) {
    this.dataService.currentUser.subscribe((user) => {
      this.loggedInUser = user

      // user.posts ? (this.latestPost = user.posts!.pop()) : null
    })
    // console.log(this.post?.user?.name)
  }

  ngOnInit(): void {}
  async handleLike() {
    if (this.postLiked) {
      this.animationState = !this.animationState
      this.httpService
        ?.delete(
          'like',
          this.postLiked,
          await this.firebaseService.user.getIdToken()
        )
        .subscribe((res) => {
          console.log(res)
          const indexOfLike = this.post.likes?.indexOf(this.postLiked!)
          this.post.likes?.splice(indexOfLike!, 1)
        })
    } else {
      this.animationState = !this.animationState
      this.httpService
        ?.Post(
          'like',
          { post_id: this.post.post_id },
          await this.firebaseService.user.getIdToken()
        )
        .subscribe((res) => {
          console.log(res)
          this.post.likes?.push(res)
        })
    }
    // if (this.showOverlay) {
    //   this.renderer.removeClass(document.body, 'overflow-hidden')
    //   this.showOverlay = false
    // } else {
    //   this.renderer.addClass(document.body, 'overflow-hidden')
    //   this.showOverlay = true
    // }
  }
}
