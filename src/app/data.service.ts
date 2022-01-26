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

  private postSource = new BehaviorSubject<Post[]>([])
  posts = this.postSource.asObservable()

  private searchResultsSource = new BehaviorSubject<User[]>([])
  searchResults = this.searchResultsSource.asObservable()

  constructor() {}
  changeUser(user: any) {
    this.userSource.next(user)
    this.postSource.next(user.posts)
    user.posts ? this.latestPostSource.next(user.posts.pop()) : null
  }

  changeSearchResults(users: User[]) {
    this.searchResultsSource.next(users)
  }

  deletePost(post: Post) {
    let updatedPosts: Post[] = []
    this.posts.subscribe((posts) => (updatedPosts = posts)).unsubscribe()

    updatedPosts = updatedPosts.filter(
      (currPost) => currPost.post_id !== post.post_id
    )

    this.postSource.next(updatedPosts)
    this.latestPostSource.next(updatedPosts[0])
  }

  addPost(post: Post) {
    let updatedPosts: Post[] = []
    this.posts.subscribe((posts) => (updatedPosts = posts)).unsubscribe()
    updatedPosts.unshift(post)

    this.postSource.next(updatedPosts)
    this.latestPostSource.next(updatedPosts[0])
  }
}
