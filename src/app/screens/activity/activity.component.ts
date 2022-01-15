import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss'],
})
export class ActivityComponent implements OnInit {
  post_id: string
  constructor(private route: ActivatedRoute) {
    this.post_id = this.route.snapshot.paramMap.get('id')!
    console.log(this.post_id)
  }

  ngOnInit(): void {}
}
