import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { LoginComponent } from './login.component'
import { HeaderComponent } from 'src/app/components/header/header.component'

@NgModule({
  declarations: [LoginComponent, HeaderComponent],
  imports: [CommonModule],
  exports: [LoginComponent],
})
export class LoginModule {}
