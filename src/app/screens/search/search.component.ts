import {
  animate,
  query,
  stagger,
  style,
  transition,
  trigger,
} from '@angular/animations'
import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { AuthService } from 'src/app/auth/firebase.service'
import { DataService } from 'src/app/data.service'
import { HttpService } from 'src/app/http/http.service'
import { IsFollowing } from 'src/app/interface/isfollowing'
import { User } from 'src/app/interface/user'

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  animations: [
    trigger('listAnimation', [
      transition('* <=> *', [
        query(
          ':enter',
          [
            style({ opacity: 0 }),
            stagger('150ms', animate('300ms ease-out', style({ opacity: 1 }))),
          ],
          { optional: true }
        ),
        query(
          ':leave',
          animate('0ms', style({ opacity: 0, position: 'absolute' })),
          {
            optional: true,
          }
        ),
      ]),
    ]),
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('0ms', style({ opacity: 0, position: 'absolute' })),
      ]),
    ]),
  ],
})
export class SearchComponent implements OnInit {
  user: User = {}
  results: boolean = false
  followingLoading: boolean = false
  unfollowingLoading: boolean = false
  searchResults: User[] = []
  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private httpService: HttpService,
    private authService: AuthService
  ) {
    this.dataService.searchResults.subscribe((users: User[]) => {
      this.searchResults = users
    })
    this.dataService.currentUser.subscribe((user) => {
      this.user = user
    })
  }

  ngOnInit(): void {
    console.log(this.route.snapshot.params['id'])
  }

  async followUser(user: User) {
    this.followingLoading = true
    this.httpService
      .Post(
        'isfollowing',
        { isfollowing_id: user.user_id },
        await this.authService.user.getIdToken()
      )
      .subscribe((res: IsFollowing) => {
        const isfollowing: IsFollowing = {
          isfollowing_id: res.isfollowing_id,
          user_id: res.user_id,
        }
        this.user.isfollowing?.push(isfollowing)

        this.followingLoading = false
      })
  }
  async unfollowUser(user: User) {
    this.unfollowingLoading = true
    this.httpService
      .delete(
        'isfollowing',
        { isfollowing_id: user.user_id },
        await this.authService.user.getIdToken()
      )
      .subscribe((res) => {
        const isfollowing = this.user.isfollowing?.filter(
          (isfollowing) => user.user_id !== isfollowing.isfollowing_id
        )
        this.user.isfollowing = isfollowing

        this.unfollowingLoading = false
      })
  }

  testFunction(user: User): boolean {
    const filteredArr = this.user.isfollowing?.filter((follow) => {
      return follow.isfollowing_id === user.user_id
    })

    if (filteredArr!.length > 0) return true
    return false
  }
}
