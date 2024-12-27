import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './components/signup-page/signup.component';
import { LoginComponent } from './components/login-page/login/login.component';
import { guardGuard } from './guards/guard.guard';
import { HomeComponent } from './components/home-page/home/home.component';
import { DescriptionComponent } from './components/description-book/description/description.component';
import { UseraccountComponent } from './components/user-account/useraccount/useraccount.component';
import { CartComponent } from './components/cart/cart/cart.component';
import { AdminComponent } from './components/admin/admin/admin.component';
import { ProfileComponent } from './components/profile/profile/profile.component';
import { ErrorComponent } from './components/404page/error/error.component';

const routes: Routes = [
  {path: '', redirectTo: 'homepage', pathMatch: 'full'},
  {path:'signup', component: SignupComponent},
  {path: 'login', component: LoginComponent},
  {path: 'homepage', component: HomeComponent},
  {path: 'admin/login', component: LoginComponent},
  {path: 'admin', component: AdminComponent, canActivate: [guardGuard]},
  {path: 'useraccount', component: UseraccountComponent, canActivate: [guardGuard]},
  {path: 'profile', component: ProfileComponent, canActivate: [guardGuard]},
  {path: 'cart', component: CartComponent},
  {path: 'description', component: DescriptionComponent},
  {path: '**', component: ErrorComponent, pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
