import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import { User } from './interface/user'

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private userSource = new BehaviorSubject<User>({})
  currentUser = this.userSource.asObservable()

  constructor() {}
  changeUser(user: any) {
    console.log('changing source')
    console.log(user)
    this.userSource.next(user)
    console.log(this.currentUser)
  }
}
