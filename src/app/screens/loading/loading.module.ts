import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { LoadingComponent } from './loading.component'
import { LottieModule } from 'ngx-lottie'
import { playerFactory } from 'src/app/services/lottie.player.service'

@NgModule({
  declarations: [LoadingComponent],
  imports: [CommonModule, LottieModule.forRoot({ player: playerFactory })],
  exports: [LoadingComponent],
})
export class LoadingModule {}
