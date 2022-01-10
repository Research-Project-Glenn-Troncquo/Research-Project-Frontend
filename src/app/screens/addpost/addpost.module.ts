import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ComponentsModule } from 'src/app/components/components.module'
import { AddpostComponent } from './addpost.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { AppRoutingModule } from 'src/app/app-routing.module'

@NgModule({
  declarations: [AddpostComponent],
  imports: [
    CommonModule,
    ComponentsModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
  ],
  exports: [AddpostComponent],
})
export class AddpostModule {}
