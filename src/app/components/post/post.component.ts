import { Component, Input, OnInit } from '@angular/core'
import { Post } from 'src/app/interface/post'
import { User } from 'src/app/interface/user'

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  @Input() post!: Post
  @Input() user!: User

  constructor() {
    // console.log(this.post?.user?.name)
  }

  ngOnInit(): void {}
}
