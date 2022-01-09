import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { DashboardComponent } from './dashboard.component'
import { LoggedinHeaderComponent } from 'src/app/components/loggedin-header/loggedin-header.component'
import { ComponentsModule } from 'src/app/components/components.module'

@NgModule({
  declarations: [DashboardComponent],
  imports: [CommonModule, ComponentsModule],
})
export class DashboardModule {}
