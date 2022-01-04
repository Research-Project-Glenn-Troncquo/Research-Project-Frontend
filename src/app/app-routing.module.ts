import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { HomeComponent } from './screens/home/home.component'
import { LoginComponent } from './screens/login/login.component'
import { RegisterComponent } from './screens/register/register.component'

export const routes: Routes = [
  { path: '', component: HomeComponent, data: { animation: 'isLeft' } },
  { path: 'login', component: LoginComponent, data: { animation: 'isMiddle' } },
  {
    path: 'register',
    component: RegisterComponent,
    data: { animation: 'isRight' },
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
