import { Component, Input, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
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
  showSidebar: boolean = false
  @Input() searchPage: boolean = false

  get usersFollowing(): User[] {
    // console.log(this.user.isfollowing)
    const usersFollowingArr = this.user.isfollowing?.filter((element) => {
      return element!.user!.username!.includes(this.searchValue) ||
        element!.user!.name!.includes(this.searchValue) ||
        element!.user!.lastname!.includes(this.searchValue)
        ? element
        : null
    })

    return this.searchValue
      ? usersFollowingArr!.map(
          ({ isfollowing_id, user_id, ...keepAttrs }) => keepAttrs.user!
        )
      : []
  }
  constructor(
    private dataService: DataService,
    public authService: AuthService,
    public router: Router,
    public httpService: HttpService,
    private route: ActivatedRoute
  ) {
    this.dataService.currentUser.subscribe((user) => {
      this.user = user
      // console.log(this.user.isfollowing)
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
        this.dataService.changeSearchResults(res)
        this.searchedUsers = []

        const results = res!.filter(
          ({ user_id: id1 }) =>
            !this.usersFollowing!.some(({ user_id: id2 }) => id2 === id1)
        )

        for (const user of results) {
          this.searchedUsers.push(user)
        }

        this.searchingUsers = false
      })
  }

  handleEnter() {
    this.router.navigate(['search'])
  }
}
