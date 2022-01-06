import { EventEmitter, Injectable } from '@angular/core'
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
import {
  AngularFireAuthModule,
  AngularFireAuth,
} from '@angular/fire/compat/auth'
import { HttpService } from '../http/http.service'
import { User } from '../interface/user'

@Injectable({ providedIn: 'root' })
export class AuthService {
  user: any
  onLoadingState = new EventEmitter()
  constructor(private auth: Auth, private httpService: HttpService) {}

  get isLoggedIn(): boolean {
    console.log(this.user)
    return this.user === null || this.user === undefined ? false : true
  }

  async restoreAuth() {
    return new Promise(async (resolve, reject) => {
      try {
        this.auth.onAuthStateChanged(async (res) => {
          console.log(await res?.getIdToken())
          this.user = res
          this.onLoadingState.emit(false)
          resolve(true)
        })
      } catch (error) {
        reject(false)
      }
    })
  }

  async login() {}

  async register(user: User) {
    try {
      const res: any = await this.httpService.post('user', user)
      console.log(res)
      return res
    } catch (error) {
      console.log(error)
    }
  }

  async loginId(id: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      signInWithCustomToken(this.auth, id)
        .then((userCredential) => {
          this.user = userCredential.user

          resolve(true)
        })
        .catch((error) => reject(false))
    })
  }
}
