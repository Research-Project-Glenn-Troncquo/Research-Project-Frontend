import { Component } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { slider } from './route-animations'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  animations: [slider],
})
export class AppComponent {
  ngOnInit(): void {
    console.log('global app component is called everytime')
  }

  loading = true

  prepareRoute(outlet: RouterOutlet) {
    return (
      outlet &&
      outlet.activatedRouteData &&
      outlet.activatedRouteData['animation']
    )
  }
}
