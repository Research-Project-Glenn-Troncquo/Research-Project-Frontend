import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { DashboardComponent } from './dashboard.component'
import { ComponentsModule } from 'src/app/components/components.module'
import { LottieModule } from 'ngx-lottie'
import { playerFactory } from '../home/home.module'

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    ComponentsModule,
    LottieModule.forRoot({ player: playerFactory }),
  ],
})
export class DashboardModule {}
