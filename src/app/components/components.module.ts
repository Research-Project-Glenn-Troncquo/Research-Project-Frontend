import { NgModule } from '@angular/core'
import { FooterComponent } from './footer/footer.component'
import { HeaderComponent } from './header/header.component'
import { ButtonComponent } from './button/button.component'
import { AppRoutingModule } from '../app-routing.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common'
import { InputErrorComponent } from './input-error/input-error.component'

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    ButtonComponent,
    InputErrorComponent,
  ],
  imports: [AppRoutingModule, FormsModule, ReactiveFormsModule, CommonModule],
  exports: [
    HeaderComponent,
    FooterComponent,
    ButtonComponent,
    InputErrorComponent,
  ],
})
export class ComponentsModule {}
