import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { HomeComponent } from './home.component'
import { ComponentsModule } from 'src/app/components/components.module'
import { LottieModule } from 'ngx-lottie'

export function playerFactory() {
  return import(/* webpackChunkName: 'lottie-web' */ 'lottie-web')
}

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    ComponentsModule,
    LottieModule.forRoot({ player: playerFactory }),
  ],
})
export class HomeModule {}
