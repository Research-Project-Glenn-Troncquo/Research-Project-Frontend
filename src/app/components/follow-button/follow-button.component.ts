import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { AuthService } from 'src/app/auth/firebase.service'
import { DataService } from 'src/app/data.service'
import { HttpService } from 'src/app/http/http.service'
import { IsFollowing } from 'src/app/interface/isfollowing'
import { User } from 'src/app/interface/user'

@Component({
  selector: 'app-follow-button',
  templateUrl: './follow-button.component.html',
  styleUrls: ['./follow-button.component.scss'],
})
export class FollowButtonComponent implements OnInit {
  user: User = {}
  @Input() inputUser: User = {}
  followingLoading: boolean = false
  unfollowingLoading: boolean = false
  @Output() emitNewFollower = new EventEmitter<IsFollowing>()
  @Output() removeFollower = new EventEmitter<IsFollowing[]>()

  constructor(
    private httpService: HttpService,
    private authService: AuthService,
    private dataService: DataService
  ) {
    this.dataService.currentUser.subscribe((user) => {
      this.user = user
    })
  }

  ngOnInit(): void {}

  testFunction(user: User): boolean {
    const filteredArr = this.user.isfollowing?.filter((follow) => {
      return follow.isfollowing_id === user.user_id
    })

    if (filteredArr!.length > 0) return true
    return false
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
        this.emitNewFollower.emit(isfollowing)
        isfollowing.user = this.user
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
        this.removeFollower.emit(isfollowing)
        console.log(isfollowing)
        this.user.isfollowing = isfollowing
        console.log(this.user.isfollowing)

        this.unfollowingLoading = false
      })
  }
}
