import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RegisterComponent } from './register.component'
import { ComponentsModule } from 'src/app/components/components.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

@NgModule({
  declarations: [RegisterComponent],
  imports: [CommonModule, ComponentsModule, FormsModule, ReactiveFormsModule],
  exports: [RegisterComponent],
})
export class RegisterModule {}
