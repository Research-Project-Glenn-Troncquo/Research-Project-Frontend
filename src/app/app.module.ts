import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { HomeComponent } from './screens/home/home.component';
import { AppHeaderComponent } from './components/app-header/app-header.component'

@NgModule({
  declarations: [AppComponent, HomeComponent, AppHeaderComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
