import { Component, OnInit } from '@angular/core'
import { AuthService } from 'src/app/auth/auth.service'

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  handleClick() {
    this.authService.signOut()
  }
}
