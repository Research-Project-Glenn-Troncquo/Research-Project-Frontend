import { Like } from './like'
import { User } from './user'

export interface Post {
  post_id?: string
  title?: string
  description?: string
  img_url?: string
  date?: string
  user?: User
  likes?: Like[]
}
