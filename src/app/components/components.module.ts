import { NgModule } from '@angular/core'
import { FooterComponent } from './footer/footer.component'
import { HeaderComponent } from './header/header.component'
import { ButtonComponent } from './button/button.component'
import { AppRoutingModule } from '../app-routing.module'

@NgModule({
  declarations: [HeaderComponent, FooterComponent, ButtonComponent],
  imports: [AppRoutingModule],
  exports: [HeaderComponent, FooterComponent, ButtonComponent],
})
export class ComponentsModule {}
