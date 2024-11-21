// login.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  loginUsuario!: FormGroup;
  submitted = false;
  isLoading = false;
  showSuccess = false;
  loginError = '';

  constructor(private fb: FormBuilder, private router: Router) {}
  
  ngOnInit(): void {
    this.loginUsuario = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        contrasena: ['', [Validators.required]],
      },
      {}
    );
  }

  getErrorMessage(controlName: string): string {
    const control = this.loginUsuario.get(controlName);
    if (!control) return '';

    if (control.hasError('required')) return 'Este campo es requerido';
    if (control.hasError('email')) return 'Email inválido';

    return '';
  }

  async onSubmit() {
    this.submitted = true;
    this.loginError = '';

    if (this.loginUsuario.valid) {
      this.isLoading = true;

      try {
        console.log('Formulario enviado:', this.loginUsuario.value);

        await new Promise((resolve) => setTimeout(resolve, 1000));

        this.showSuccess = true;

        setTimeout(() => {
          this.router.navigate(['/home']);
        }, 1000);
      } catch (error) {
        console.error('Error al iniciar sesión:', error);
        this.loginError =
          'Error al iniciar sesión. Por favor, intente nuevamente.';
      } finally {
        this.isLoading = false;
      }
    } else {
      Object.keys(this.loginUsuario.controls).forEach((key) => {
        const control = this.loginUsuario.get(key);
        if (control?.errors) {
          console.log(`${key} errors:`, control.errors);
        }
      });
    }
  }

  onReset() {
    this.submitted = false;
    this.loginUsuario.reset();
    this.showSuccess = false;
    this.loginError = '';
  }
}
