import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Inputs } from '../input/inputs';

@Component({
  selector: 'app-forget-password',
  imports: [ReactiveFormsModule, RouterLink, Inputs],
  standalone:true,
  templateUrl: './forgetPassword.html',
  styleUrl: './forgetPassword.css',
})
export class ForgetPassword {
  private fb = inject(FormBuilder);

  submitted = signal(false);

  emailControl = this.fb.nonNullable.control('', [
    Validators.required,
    Validators.email,
  ]);

  sendResetLink(): void {
    console.log('clicked Next, email:', this.emailControl.value, 'valid:', this.emailControl.valid);
    if (this.emailControl.invalid) {
      this.emailControl.markAsTouched();
      return;
    }

 


    console.log('Sending password reset link to:', this.emailControl.value);
    this.submitted.set(true);
  }

  backToEmail(): void {
    this.submitted.set(false);
  }
}
