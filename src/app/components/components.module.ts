import { NgModule } from '@angular/core'
import { FooterComponent } from './footer/footer.component'
import { HeaderComponent } from './header/header.component'
import { ButtonComponent } from './button/button.component'
import { AppRoutingModule } from '../app-routing.module'
import { InputComponent } from './input/input.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common'

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    ButtonComponent,
    InputComponent,
  ],
  imports: [AppRoutingModule, FormsModule, ReactiveFormsModule, CommonModule],
  exports: [HeaderComponent, FooterComponent, ButtonComponent, InputComponent],
})
export class ComponentsModule {}
