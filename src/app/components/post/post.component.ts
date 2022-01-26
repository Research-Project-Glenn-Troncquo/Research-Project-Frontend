import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { Post } from 'src/app/interface/post'
import { User } from 'src/app/interface/user'
import { Renderer2 } from '@angular/core'
import { DataService } from 'src/app/data.service'
import { HttpService } from 'src/app/http/http.service'
import { AuthService } from 'src/app/auth/firebase.service'
import {
  animate,
  keyframes,
  query,
  stagger,
  style,
  transition,
  trigger,
} from '@angular/animations'
import { Router } from '@angular/router'

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
    trigger('listAnimation', [
      transition('* <=> *', [
        query(
          ':enter',
          [
            style({ opacity: 0 }),
            stagger('50ms', animate('300ms ease-out', style({ opacity: 1 }))),
          ],
          { optional: true }
        ),
        query(':leave', animate('0ms', style({ opacity: 0 })), {
          optional: true,
        }),
      ]),
    ]),
    trigger('slideIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(-30px)' }),
        animate('300ms', style({ opacity: 1, transform: 'translateX(0px)' })),
      ]),
      transition(':leave', [animate('100ms', style({ opacity: 0 }))]),
    ]),
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [animate('300ms', style({ opacity: 0 }))]),
    ]),
  ],
})
export class PostComponent implements OnInit {
  @Input() post!: Post
  @Input() user!: User
  @Output() emitPostClick = new EventEmitter<Post>()
  @Output() emitLikesClick = new EventEmitter<Post>()
  @Output() emitDeleteOverlay = new EventEmitter<Post>()

  loggedInUser: User = {}
  showOverlay: boolean = false
  animationState: boolean = false
  showComment: boolean = false
  textAreaValue: string = ''

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
    private dataService: DataService,
    private httpService: HttpService,
    private firebaseService: AuthService,
    public router: Router
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

  async handleComment() {
    if (this.textAreaValue) {
      this.httpService
        ?.Post(
          'comment',
          { post_id: this.post.post_id, comment: this.textAreaValue },
          await this.firebaseService.user.getIdToken()
        )
        .subscribe((res) => {
          this.post.comments?.push(res)
          this.textAreaValue = ''
        })
    }
  }

  async deleteComment(comment: any) {
    this.httpService
      ?.delete('comment', comment, await this.firebaseService.user.getIdToken())
      .subscribe((res) => {
        const indexOfComment = this.post.comments?.indexOf(comment)
        this.post.comments?.splice(indexOfComment!, 1)
      })
  }

  toggleComment() {
    this.showComment = !this.showComment
  }

  doTextareaValueChange(ev: any) {
    try {
      this.textAreaValue = ev.target.value
    } catch (e) {
      console.info('could not set textarea-value')
    }
  }

  handlePostEmit(post: Post) {
    this.emitPostClick.emit(post)
  }

  handleLikesClick(post: Post) {
    this.emitLikesClick.emit(post)
  }

  handleDeleteClick(post: Post) {
    this.emitDeleteOverlay.emit(post)
  }

  handleProfileClick(user_id: string) {
    this.router.navigate([`profile/${user_id}`])
  }
}
