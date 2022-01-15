import { Component, Input, OnInit } from '@angular/core'
import { User } from 'src/app/interface/user'

@Component({
  selector: 'app-post-comment',
  templateUrl: './post-comment.component.html',
  styleUrls: ['./post-comment.component.scss'],
})
export class PostCommentComponent implements OnInit {
  @Input() user!: User

  constructor() {}

  ngOnInit(): void {}
}
