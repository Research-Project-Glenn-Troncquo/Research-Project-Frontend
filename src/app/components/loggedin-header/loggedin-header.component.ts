import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { AuthService } from 'src/app/auth/firebase.service'
import { DataService } from 'src/app/data.service'
import { User } from 'src/app/interface/user'

@Component({
  selector: 'app-loggedin-header',
  templateUrl: './loggedin-header.component.html',
  styleUrls: ['./loggedin-header.component.scss'],
})
export class LoggedinHeaderComponent implements OnInit {
  user: User = {}
  constructor(
    private dataService: DataService,
    public authService: AuthService,
    public router: Router
  ) {
    this.dataService.currentUser.subscribe((user) => {
      this.user = user
    })
  }

  ngOnInit(): void {}

  onClick() {
    console.log('hello')
  }

  handleSignOut() {
    this.authService.signOut()
    this.router.navigate(['/'])
  }
}
