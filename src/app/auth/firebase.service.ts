import { EventEmitter, Injectable, Input } from '@angular/core'
import { FirebaseApp, initializeApp } from 'firebase/app'
// import { randomBytes } from 'crypto'
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
import {
  getDownloadURL,
  getStorage,
  ref as stRef,
  uploadBytes,
} from 'firebase/storage'
import { environment } from 'src/environments/environment'
import { DataService } from '../data.service'

@Injectable({ providedIn: 'root' })
export class AuthService {
  user: any
  onLoadingState = new EventEmitter()
  app: FirebaseApp = initializeApp(environment.firebase)
  constructor(
    public auth?: Auth,
    public httpService?: HttpService,
    public dataService?: DataService
  ) {
    this._isLoggedIn =
      this.user === null || this.user === undefined ? false : true
  }

  public _isLoggedIn: boolean
  get isLoggedIn(): boolean {
    return this._isLoggedIn
  }

  set isLoggedIn(value: boolean) {
    this._isLoggedIn = value
  }

  async restoreAuth(): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        this.auth!.onAuthStateChanged(async (res) => {
          console.log(await res?.getIdToken())
          this.user = res
          console.log(res)
          res === undefined || res === null
            ? (this.isLoggedIn = false)
            : (this.isLoggedIn = true)

          if (this.isLoggedIn) {
            this.getUser()
          } else this.dataService?.changeUser({})

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
    this.isLoggedIn = false
    return signOut(this.auth!)
  }

  async fileUpload(file: any) {
    const storage = getStorage(this.app)

    // const random_id = randomBytes(8).toString('base64')
    const uploadImage = stRef(storage, `post-pictures/hell-world/${file.name}`)

    await uploadBytes(uploadImage, file).then((snapshot) => {
      console.log(snapshot)
    })

    const url = await getDownloadURL(
      stRef(storage, `post-pictures/hell-world/${file.name}`)
    ).then((url) => {
      console.log(url)
      return url
    })

    return url
  }

  async getUser() {
    this.httpService
      ?.Get('user', await this.user.getIdToken())
      .subscribe((res) => {
        // this.user = res
        this.dataService?.changeUser(res)
      })
  }
}
