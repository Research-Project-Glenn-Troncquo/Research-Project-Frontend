import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { HomeComponent } from './home.component'
import { ComponentsModule } from 'src/app/components/components.module'
import { LottieModule } from 'ngx-lottie'
import { playerFactory } from 'src/app/services/lottie.player.service'

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    ComponentsModule,
    LottieModule.forRoot({ player: playerFactory }),
  ],
})
export class HomeModule {}
