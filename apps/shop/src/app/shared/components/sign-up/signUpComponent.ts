import { Component, ElementRef, OnDestroy, computed, inject, signal, viewChildren } from '@angular/core';
import { Inputs } from '../input/inputs';
import { ReactiveFormsModule, FormBuilder, Validators, ValidationErrors, AbstractControl } from '@angular/forms';
import { RouterLink } from '@angular/router';

function passwordsMatchValidator(group: AbstractControl): ValidationErrors | null {
  const password = group.get('password')?.value;
  const confirmPassword = group.get('confirmPassword')?.value;
  if (!password || !confirmPassword) return null;
  return password === confirmPassword ? null : { passwordMismatch: true };
}
@Component({
  selector: 'app-sign-up-component',
  imports: [ReactiveFormsModule, Inputs,RouterLink],
  templateUrl: './signUpComponent.html',
  styleUrl: './signUpComponent.css',
})

export class SignUpComponent {
private fb = inject(FormBuilder);
  private otpInputRefs = viewChildren<ElementRef<HTMLInputElement>>('otpInput');

  step = signal<'email' | 'otp' | 'user-info' | 'password'>('email');
  readonly otpBoxes = [0, 1, 2, 3, 4, 5];
  otpValues = signal<string[]>(['', '', '', '', '', '']);
  countdown = signal(60);

  showPassword = signal(false);
  showConfirmPassword = signal(false);

  isOtpComplete = computed(() => this.otpValues().join('').length === 6);

  emailControl = this.fb.control('', [Validators.required, Validators.email]);

  userInfoForm = this.fb.nonNullable.group({
    firstName: ['', [Validators.required, Validators.minLength(2)]],
    lastName: ['', [Validators.required, Validators.minLength(2)]],
    username: ['', [Validators.required, Validators.minLength(3)]],
    phone: ['', [Validators.pattern(/^[0-9]{8,12}$/)]],
  });

  passwordForm = this.fb.nonNullable.group(
    {
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]],
    },
    { validators: passwordsMatchValidator },
  );

  private intervalId: ReturnType<typeof setInterval> | null = null;

  private getInputs(): HTMLInputElement[] {
    return this.otpInputRefs().map((ref) => ref.nativeElement);
  }

  goToOtp(): void {
    if (this.emailControl.invalid) {
      this.emailControl.markAsTouched();
      return;
    }

    this.resetOtp();
    this.step.set('otp');
    this.startTimer();
  }

  editEmail(): void {
    this.clearTimer();
    this.step.set('email');
  }

  startTimer(): void {
    this.clearTimer();
    this.countdown.set(60);

    this.intervalId = setInterval(() => {
      if (this.countdown() > 0) {
        this.countdown.update((v) => v - 1);
      } else {
        this.clearTimer();
      }
    }, 1000);
  }

  resendCode(): void {
    this.resetOtp();
    this.startTimer();
  }

  onOtpInput(event: Event, index: number): void {
    const input = event.target as HTMLInputElement;
    const cleanChar = input.value.replace(/[^0-9]/g, '').slice(-1);
    const inputs = this.getInputs();

    this.otpValues.update((current) => {
      const next = [...current];
      next[index] = cleanChar;
      return next;
    });

    input.value = cleanChar;

    if (cleanChar && index < inputs.length - 1) {
      inputs[index + 1]?.focus();
    }
  }

  onOtpKeydown(event: KeyboardEvent, index: number): void {
    const inputs = this.getInputs();
    if (event.key === 'Backspace' && !this.otpValues()[index] && index > 0) {
      inputs[index - 1]?.focus();
    }
  }

  onOtpPaste(event: ClipboardEvent): void {
    event.preventDefault();
    const pasted = (event.clipboardData?.getData('text') ?? '')
      .replace(/[^0-9]/g, '')
      .slice(0, 6);

    if (!pasted) return;

    const inputs = this.getInputs();
    const next = ['', '', '', '', '', ''];

    for (let i = 0; i < pasted.length; i++) {
      next[i] = pasted[i];
      if (inputs[i]) {
        inputs[i].value = pasted[i];
      }
    }

    this.otpValues.set(next);
    const focusIndex = Math.min(pasted.length, inputs.length - 1);
    inputs[focusIndex]?.focus();
  }

  verifyOtp(): void {
    if (!this.isOtpComplete()) return;
    this.clearTimer();
    this.step.set('user-info');
  }

  goToPassword(): void {
    if (this.userInfoForm.invalid) {
      this.userInfoForm.markAllAsTouched();
      return;
    }
    this.step.set('password');
  }

  submitRegistration(): void {
    if (this.passwordForm.invalid) {
      this.passwordForm.markAllAsTouched();
      return;
    }

    const payload = {
      email: this.emailControl.value,
      otp: this.otpValues().join(''),
      ...this.userInfoForm.getRawValue(),
      password: this.passwordForm.controls.password.value,
    };

    console.log('Register payload:', payload);
  }

  private resetOtp(): void {
    this.otpValues.set(['', '', '', '', '', '']);
  }

  private clearTimer(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  ngOnDestroy(): void {
    this.clearTimer();
  }
}