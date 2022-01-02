import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { LoginComponent } from './login.component'
import { HeaderComponent } from 'src/app/components/header/header.component'
import { ComponentsModule } from 'src/app/components/components.module'

@NgModule({
  declarations: [LoginComponent],
  imports: [CommonModule, ComponentsModule],
  exports: [LoginComponent],
})
export class LoginModule {}
