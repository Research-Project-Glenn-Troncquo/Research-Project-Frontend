import { animate, style, transition, trigger } from '@angular/animations'
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { Post } from 'src/app/interface/post'

@Component({
  selector: 'app-delete-post',
  templateUrl: './delete-post.component.html',
  styleUrls: ['./delete-post.component.scss'],
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
export class DeletePostComponent implements OnInit {
  @Input() deletePostOverlay: boolean = false
  @Input() activePost?: Post
  @Output() emitDeletePostOverlay = new EventEmitter()
  @Output() emitDeletePost = new EventEmitter<Post>()

  constructor() {}

  ngOnInit(): void {}

  closeDeletePostOverlay() {
    this.emitDeletePostOverlay.emit()
  }
  deletePost(post: Post) {
    this.emitDeletePost.emit(post)
  }
}
