import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { DashboardComponent } from './dashboard.component'
import { ComponentsModule } from 'src/app/components/components.module'
import { LottieModule } from 'ngx-lottie'
import { PickerModule } from '@ctrl/ngx-emoji-mart'
import { playerFactory } from 'src/app/services/lottie.player.service'
import { FormsModule } from '@angular/forms'

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    ComponentsModule,
    PickerModule,
    FormsModule,
    LottieModule.forRoot({ player: playerFactory }),
  ],
})
export class DashboardModule {}
