import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { LoginComponent } from './login.component'
import { HeaderComponent } from 'src/app/components/header/header.component'
import { ComponentsModule } from 'src/app/components/components.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

@NgModule({
  declarations: [LoginComponent],
  imports: [CommonModule, ComponentsModule, FormsModule, ReactiveFormsModule],
  exports: [LoginComponent],
})
export class LoginModule {}
