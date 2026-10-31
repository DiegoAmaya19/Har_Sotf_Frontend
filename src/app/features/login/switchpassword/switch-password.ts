import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-switch-password',
  imports: [ReactiveFormsModule],
  templateUrl: './switch-password.html',
  host: {
    class: 'block w-full',
  },
})
export class SwitchPasswordComponent {
  private readonly fb = inject(FormBuilder);
  private readonly loginService = inject(LoginService);
  protected readonly isSubmitting = signal(false);

  protected readonly form = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    currentPassword: ['', Validators.required],
    newPassword: ['', [Validators.required, Validators.minLength(8)]],
    confirmPassword: ['', Validators.required],
  });

  protected onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { username, currentPassword, newPassword, confirmPassword } = this.form.getRawValue();

    if (newPassword !== confirmPassword) {
      alert('La nueva contraseña y la confirmación no coinciden.');
      return;
    }

    this.isSubmitting.set(true);

    this.loginService;
  }
}
