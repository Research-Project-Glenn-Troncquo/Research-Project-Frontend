import { Injectable } from '@angular/core'
import { Observable, of } from 'rxjs'
import {
  Auth,
  browserLocalPersistence,
  getAuth,
  setPersistence,
  signInWithEmailAndPassword,
  signOut,
  User,
  signInWithCustomToken,
  sendPasswordResetEmail,
} from 'firebase/auth'

@Injectable({ providedIn: 'root' })
export class AuthService {
  public user?: User | null
  auth: Auth = getAuth()

  constructor() {}

  restoreAuth() {
    return new Promise((resolve, reject) => {
      try {
        this.auth.onAuthStateChanged((res) => {
          console.log('auth changed', res)
          this.user = res
        })
        resolve(true)
      } catch (error) {
        reject(false)
      }
    })
  }
}
