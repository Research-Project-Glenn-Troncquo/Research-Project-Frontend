import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ComponentsModule } from 'src/app/components/components.module'
import { AddpostComponent } from './addpost.component'

@NgModule({
  declarations: [AddpostComponent],
  imports: [CommonModule, ComponentsModule],
})
export class AddpostModule {}
