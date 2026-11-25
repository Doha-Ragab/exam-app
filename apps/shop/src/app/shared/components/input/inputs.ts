import { Component, computed, forwardRef, input, signal } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
let nextInputId = 0;

@Component({
  selector: 'app-inputs',
  imports: [],
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => Inputs),
      multi: true,
    },
  ],
  templateUrl: './inputs.html',
  styleUrl: './inputs.css',
})
export class Inputs {
   label = input<string>('');
  placeholder = input<string>('');
  type = input<'text' | 'email' | 'password'>('text');
  errorMessage = input<string>('');

  readonly inputId = signal(`auth-input-${++nextInputId}`);
  value = signal<string>('');
  isDisabled = signal<boolean>(false);
  showPassword = signal<boolean>(false);

  currentType = computed(() => {
    if (this.type() === 'password') {
      return this.showPassword() ? 'text' : 'password';
    }
    return this.type();
  });

  inputClasses = computed(() => {
    const base =
      'h-[46px] w-full rounded-md border px-3 text-sm text-slate-900 placeholder:text-slate-400 transition focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:bg-slate-50';
    const paddingEnd = this.type() === 'password' ? 'pe-14' : '';
    const stateClasses = this.errorMessage()
      ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
      : 'border-slate-300 focus:border-blue-600 focus:ring-blue-600/20';

    return `${base} ${paddingEnd} ${stateClasses}`;
  });

  private onChange: (val: string) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(val: string | null): void {
    this.value.set(val ?? '');
  }

  registerOnChange(fn: (val: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled.set(isDisabled);
  }

  handleInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.value.set(target.value);
    this.onChange(target.value);
  }

  handleBlur(): void {
    this.onTouched();
  }

  togglePassword(): void {
    this.showPassword.update((v) => !v);
  }
}
