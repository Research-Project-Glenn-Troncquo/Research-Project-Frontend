import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import { Post } from './interface/post'
import { User } from './interface/user'

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private userSource = new BehaviorSubject<User>({})
  currentUser = this.userSource.asObservable()

  private latestPostSource = new BehaviorSubject<Post>({})
  latestPost = this.latestPostSource.asObservable()

  constructor() {}
  changeUser(user: any) {
    this.userSource.next(user)
    user.posts ? this.latestPostSource.next(user.posts.pop()) : null
  }
}
