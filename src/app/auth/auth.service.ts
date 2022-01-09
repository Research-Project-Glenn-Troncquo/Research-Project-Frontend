import { EventEmitter, Injectable, Input } from '@angular/core'
import { Observable, of } from 'rxjs'
import {
  Auth,
  browserLocalPersistence,
  getAuth,
  setPersistence,
  signInWithEmailAndPassword,
  signOut,
  signInWithCustomToken,
  sendPasswordResetEmail,
} from '@angular/fire/auth'
import { HttpService } from '../http/http.service'
import { User } from '../interface/user'

@Injectable({ providedIn: 'root' })
export class AuthService {
  user: any
  onLoadingState = new EventEmitter()
  constructor(public auth?: Auth, public httpService?: HttpService) {
    this._isLoggedIn =
      this.user === null || this.user === undefined ? false : true
  }

  public _isLoggedIn: boolean
  get isLoggedIn(): boolean {
    return this._isLoggedIn
  }

  set isLoggedIn(value: boolean) {
    this._isLoggedIn =
      this.user === null || this.user === undefined ? false : true
    value ? (this._isLoggedIn = value) : null
  }

  async restoreAuth(): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        this.auth!.onAuthStateChanged(async (res) => {
          console.log(await res?.getIdToken())
          this.user = res
          resolve(true)
        })
      } catch (error) {
        reject(false)
      }
    })
  }

  async login(email: string, password: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      signInWithEmailAndPassword(this.auth!, email, password)
        .then(async (userCredential) => {
          this.user = userCredential.user
          console.log(this.user)
          resolve(true)
        })
        .catch((error) => {
          resolve(error)
        })
    })
  }

  async register(user: User) {
    try {
      const res: any = await this.httpService!.post('user', user)
      console.log(res)
      return res
    } catch (error) {
      console.log(error)
    }
  }

  async loginId(id: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      signInWithCustomToken(this.auth!, id)
        .then((userCredential) => {
          this.user = userCredential.user

          resolve(true)
        })
        .catch((error) => reject(false))
    })
  }

  signOut() {
    this.user = null
    return signOut(this.auth!)
  }
}
