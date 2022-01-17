import {
  animate,
  keyframes,
  style,
  transition,
  trigger,
} from '@angular/animations'
import { Component, Input, OnInit } from '@angular/core'
import { AuthService } from 'src/app/auth/firebase.service'
import { HttpService } from 'src/app/http/http.service'
import { Post } from 'src/app/interface/post'
import { User } from 'src/app/interface/user'

@Component({
  selector: 'app-like-comment',
  templateUrl: './like-comment.component.html',
  styleUrls: ['./like-comment.component.scss'],
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
export class LikeCommentComponent implements OnInit {
  @Input() post!: Post
  @Input() user!: User
  showComment: boolean = false
  animationState: boolean = false

  get postLiked() {
    let liked = null
    for (const like of this.post.likes!) {
      if (like.user_id === this.user.user_id) {
        liked = like
      }
    }
    return liked
  }
  constructor(
    private httpService: HttpService,
    private firebaseService: AuthService
  ) {}

  ngOnInit(): void {}

  toggleComment() {
    this.showComment = !this.showComment
  }

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
          this.post.likes?.push(res)
        })
    }
  }
}
