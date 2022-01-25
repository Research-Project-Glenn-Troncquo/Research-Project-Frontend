import { animate, style, transition, trigger } from '@angular/animations'
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { AuthService } from 'src/app/auth/firebase.service'
import { HttpService } from 'src/app/http/http.service'
import { Post } from 'src/app/interface/post'
import { User } from 'src/app/interface/user'

@Component({
  selector: 'app-post-overlay',
  templateUrl: './post-overlay.component.html',
  styleUrls: ['./post-overlay.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('150ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [animate('150ms', style({ opacity: 0 }))]),
    ]),
  ],
})
export class PostOverlayComponent implements OnInit {
  @Input() postOverlay: boolean = false
  @Input() activePost?: Post
  @Input() user!: User
  // @Input() loggedInUser: User
  textAreaValue: string = ''
  emojiOverlay: boolean = false
  @Output() emitDeletePostOverlay = new EventEmitter<Post>()
  @Output() emitLikesOverlay = new EventEmitter<Post>()
  @Output() emitClosePostOverlay = new EventEmitter()
  @Output() emitDeleteOverlay = new EventEmitter<Post>()

  constructor(
    private httpService: HttpService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {}

  closePostOverlay() {
    console.log('hello')
    this.emitClosePostOverlay.emit()
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

  handleDeletePostOverlay(post: Post) {
    this.emitDeletePostOverlay.emit(post)
  }

  handleLikesOverlay(post: Post) {
    this.emitLikesOverlay.emit(post)
  }

  handleEmojiOverlay() {
    this.emojiOverlay = !this.emojiOverlay
  }

  async deleteComment(comment: any) {
    this.httpService
      ?.delete('comment', comment, await this.authService.user.getIdToken())
      .subscribe((res) => {
        const indexOfComment = this.activePost?.comments?.indexOf(comment)
        this.activePost?.comments?.splice(indexOfComment!, 1)
      })
  }

  addEmoji(event: any) {
    this.textAreaValue += event.emoji.native
  }

  handleDeleteClick(post: Post) {
    
    this.emitDeleteOverlay.emit(post)
  }
}
