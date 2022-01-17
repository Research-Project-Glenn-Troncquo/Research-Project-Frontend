import { IsFollowing } from './isfollowing';
import { Post } from './post'

export interface User {
  user_id?: string
  name?: string
  lastname?: string
  username?: string
  email?: string
  password?: string
  posts?: Array<Post>
  isfollowing?: Array<IsFollowing>
  followers?: Array<string>
  img_url?: string
}
