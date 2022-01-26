import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
// import { HomeModule } from './screens/home/home.module'
import { LoginModule } from './screens/login/login.module'
import { RegisterModule } from './screens/register/register.module'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { ComponentsModule } from './components/components.module'
import { environment } from '../environments/environment'
import { initializeApp, provideFirebaseApp } from '@angular/fire/app'
import { provideAuth, getAuth } from '@angular/fire/auth'
import { LoadingComponent } from './screens/loading/loading.component'
import { LottieModule } from 'ngx-lottie'
import { DashboardModule } from './screens/dashboard/dashboard.module'
import { AddpostComponent } from './screens/addpost/addpost.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'
import { ActivityComponent } from './screens/activity/activity.component'
import { LoadingModule } from './screens/loading/loading.module'
import { SearchComponent } from './screens/search/search.component'
import { HomeModule } from './screens/home/home.module'
import { ProfileComponent } from './screens/profile/profile.component'
import { SettingsComponent } from './screens/settings/settings.component';
import { TestComponent } from './screens/test/test.component'

@NgModule({
  declarations: [
    AppComponent,
    AddpostComponent,
    ActivityComponent,
    SearchComponent,
    ProfileComponent,
    SettingsComponent,
    TestComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,

    ComponentsModule,
    HomeModule,
    LoginModule,
    RegisterModule,
    DashboardModule,
    LoadingModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
