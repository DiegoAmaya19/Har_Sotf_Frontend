import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.web.html',
})
export class LoginWeb {
  private readonly fb = inject(FormBuilder);
  protected readonly isSubmitting = signal(false); // Define isSubmitting como una señal

  // Define el formulario reactivo
  protected readonly loginForm = this.fb.group({
    username: ['', Validators.required], // Campo obligatorio para el nombre de usuario
    password: ['', Validators.required], // Campo obligatorio para la contraseña
    rememberMe: [false], // Campo opcional para "Recuérdame"
  });

  goProvisional(): void {

  }

  // Método para manejar el envío del formulario
  protected onLogin() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched(); // Marca todos los campos como tocados si el formulario es inválido
      return;
    }

    const { username, password } = this.loginForm.getRawValue(); // Obtiene los valores del formulario

    this.isSubmitting.set(true); // Cambia el estado de isSubmitting a true

    // Simula una solicitud de inicio de sesión
    console.log('Iniciando sesión con:', { username, password });

    // Simula un retraso para el envío
    setTimeout(() => {
      this.isSubmitting.set(false); // Cambia el estado de isSubmitting a false después de completar el envío
    }, 2000);
  }
}
