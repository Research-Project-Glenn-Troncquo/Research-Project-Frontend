import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { DataService } from 'src/app/data.service'
import { User } from 'src/app/interface/user'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: ['.active { color:#CB5931;} .active div{ background-color:#CB5931;}'],
})
export class HeaderComponent implements OnInit {
  user: User = {}
  constructor(public router: Router, private dataService: DataService) {
    this.dataService.currentUser.subscribe((user) => {
      this.user = user
    })
  }
  ngOnInit(): void {}

  showSidebar: boolean = false
}
