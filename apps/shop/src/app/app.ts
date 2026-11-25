import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { RegisterSidePanel } from './shared/components/register-side-panel/registerSidePanel';
import { Login } from './shared/components/login/login';
import { SignUpComponent } from './shared/components/sign-up/signUpComponent';
import { ForgetPassword } from './shared/components/forget-password/forgetPassword';

@Component({
  imports: [RouterModule,RegisterSidePanel,Login, RouterOutlet,SignUpComponent,ForgetPassword],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  protected title = 'Nx Shop Demo';
}
