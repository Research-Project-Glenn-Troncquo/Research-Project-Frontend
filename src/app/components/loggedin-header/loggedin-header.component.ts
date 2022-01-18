import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { AuthService } from 'src/app/auth/firebase.service'
import { DataService } from 'src/app/data.service'
import { HttpService } from 'src/app/http/http.service'
import { User } from 'src/app/interface/user'

@Component({
  selector: 'app-loggedin-header',
  templateUrl: './loggedin-header.component.html',
  styleUrls: ['./loggedin-header.component.scss'],
})
export class LoggedinHeaderComponent implements OnInit {
  user: User = {}
  searchValue: string = ''
  searchingUsers: boolean = false
  searchedUsers: User[] = []

  get usersFollowing() {
    const usersFollowingArr = this.user.isfollowing?.filter((element) => {
      return element!.user!.username!.includes(this.searchValue) ||
        element!.user!.name!.includes(this.searchValue) ||
        element!.user!.lastname!.includes(this.searchValue)
        ? element
        : null
    })

    return this.searchValue ? usersFollowingArr : []
  }
  constructor(
    private dataService: DataService,
    public authService: AuthService,
    public router: Router,
    public httpService: HttpService
  ) {
    this.dataService.currentUser.subscribe((user) => {
      this.user = user
      console.log(this.user.isfollowing)
    })
  }

  ngOnInit(): void {}

  onClick() {
    this.router.navigate(['/post/new'])
  }

  handleSignOut() {
    this.authService.signOut()
    this.router.navigate(['/'])
  }
  async handleSearchValue() {
    this.searchingUsers = true
    this.httpService
      .Post(
        'user/find',
        { name: this.searchValue },
        await this.authService.user.getIdToken()
      )
      .subscribe((res: User[]) => {
        console.log(res)
        if (res.length > 0) this.searchedUsers = res
        this.searchingUsers = true
      })
  }
}
