import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { AuthGuard } from './auth/auth.guard'
import { ActivityComponent } from './screens/activity/activity.component'
import { AddpostComponent } from './screens/addpost/addpost.component'
import { DashboardComponent } from './screens/dashboard/dashboard.component'
import { HomeComponent } from './screens/home/home.component'
import { LoadingComponent } from './screens/loading/loading.component'
import { LoginComponent } from './screens/login/login.component'
import { ProfileComponent } from './screens/profile/profile.component'
import { RegisterComponent } from './screens/register/register.component'
import { SearchComponent } from './screens/search/search.component'
import { SettingsComponent } from './screens/settings/settings.component'

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: { animation: 'isLeft' },
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
    data: { animation: 'isMiddle' },
    canActivate: [AuthGuard],
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: { animation: 'isRight' },
    canActivate: [AuthGuard],
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    data: { animation: 'Dashboard' },
  },
  {
    path: 'dashboard/:id',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'post/new',
    component: AddpostComponent,
    canActivate: [AuthGuard],
    pathMatch: 'full',
  },
  {
    path: 'activity/:id',
    component: ActivityComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'search',
    component: SearchComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'search/:id',
    component: SearchComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'profile/:id',
    component: ProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'settings',
    component: SettingsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    redirectTo: '/',
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
