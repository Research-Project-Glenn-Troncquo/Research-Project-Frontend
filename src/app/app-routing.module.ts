import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { AuthGuard } from './auth/auth.guard'
import { HomeComponent } from './screens/home/home.component'
import { LoadingComponent } from './screens/loading/loading.component'
import { LoginComponent } from './screens/login/login.component'
import { OverviewComponent } from './screens/overview/overview.component'
import { RegisterComponent } from './screens/register/register.component'

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
    component: OverviewComponent,
    canActivate: [AuthGuard],
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
