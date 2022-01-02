import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: ['.active { color:#CB5931;} .active div{ background-color:#CB5931;}'],
})
export class HeaderComponent implements OnInit {
  constructor(public router: Router) {}

  ngOnInit(): void {}
}
