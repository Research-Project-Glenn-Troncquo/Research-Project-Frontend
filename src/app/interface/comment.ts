import { User } from './user'

export interface Comment {
  comment_id?: string
  comment?: string
  user?: User
}
