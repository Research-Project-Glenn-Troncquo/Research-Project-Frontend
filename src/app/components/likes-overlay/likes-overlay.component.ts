import { animate, style, transition, trigger } from '@angular/animations'
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { Post } from 'src/app/interface/post'
import { User } from 'src/app/interface/user'

@Component({
  selector: 'app-likes-overlay',
  templateUrl: './likes-overlay.component.html',
  styleUrls: ['./likes-overlay.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('150ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [animate('150ms', style({ opacity: 0 }))]),
    ]),

    trigger('fadeUp', [
      transition(':enter', [
        style({ opacity: 0, top: '0px' }),
        animate('150ms', style({ opacity: 1, top: '10px' })),
      ]),
      transition(':leave', [animate('50ms', style({ opacity: 0 }))]),
    ]),
  ],
})
export class LikesOverlayComponent implements OnInit {
  @Input() likeOverlay: boolean = false
  @Input() activePost?: Post
  @Input() user!: User
  @Output() emitCloseLikesOverlay = new EventEmitter()

  constructor() {}

  ngOnInit(): void {}

  closeLikesOverlay() {
    this.emitCloseLikesOverlay.emit()
  }
}
