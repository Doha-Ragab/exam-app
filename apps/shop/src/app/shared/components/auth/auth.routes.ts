import { Route } from '@angular/router';
import { Auth } from '@org/auth';
import { Login } from '../login/login';
import { SignUpComponent } from '../sign-up/signUpComponent';
import { ForgetPassword } from '../forget-password/forgetPassword';

export const authRoutes: Route[] = [
 { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'register', component: SignUpComponent },
  { path: 'forgot-password', component: ForgetPassword },
];