import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { HomeModule } from './screens/home/home.module'
import { LoginModule } from './screens/login/login.module'
import { RegisterModule } from './screens/register/register.module'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { ComponentsModule } from './components/components.module'
import { environment } from '../environments/environment'
import { initializeApp, provideFirebaseApp } from '@angular/fire/app'
import { provideAuth, getAuth } from '@angular/fire/auth'
import { LoadingComponent } from './screens/loading/loading.component'
import { LottieModule } from 'ngx-lottie'
import { DashboardModule } from './screens/dashboard/dashboard.module';
import { AddpostComponent } from './screens/addpost/addpost.component'

@NgModule({
  declarations: [AppComponent, LoadingComponent, AddpostComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HomeModule,
    LoginModule,
    RegisterModule,
    BrowserAnimationsModule,
    DashboardModule,
    ComponentsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
