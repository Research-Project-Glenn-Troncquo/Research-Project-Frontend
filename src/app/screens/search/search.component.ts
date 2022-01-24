import {
  animate,
  query,
  stagger,
  style,
  transition,
  trigger,
} from '@angular/animations'
import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
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
            stagger('30ms', animate('150ms ease-out', style({ opacity: 1 }))),
          ],
          { optional: true }
        ),
        // query(
        //   ':leave',
        //   animate('0ms', style({ opacity: 0, position: 'absolute' })),
        //   {
        //     optional: true,
        //   }
        // ),
      ]),
    ]),
  ],
})
export class SearchComponent implements OnInit {
  // user: User = {}
  results: boolean = false

  searchResults: User[] = []
  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    public router: Router
  ) {
    this.dataService.searchResults.subscribe((users: User[]) => {
      this.searchResults = users
    })
  }

  ngOnInit(): void {
    console.log(this.route.snapshot.params['id'])
  }

  handleProfileClick(user_id: string) {
    this.router.navigate([`profile/${user_id}`])
  }
}
