import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RegisterComponent } from './register.component'
import { ComponentsModule } from 'src/app/components/components.module'

@NgModule({
  declarations: [RegisterComponent],
  imports: [CommonModule, ComponentsModule],
  exports: [RegisterComponent],
})
export class RegisterModule {}
