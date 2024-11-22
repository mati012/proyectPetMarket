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

interface User {
  email: string;
  password: string;
  role: string;
}

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

  // Usuarios estáticos
  private readonly USERS: User[] = [
    {
      email: 'mati@gmail.com',
      password: 'Mati0123',
      role: 'user'
    },
    {
      email: 'admin@gmail.com',
      password: 'Admin0123',
      role: 'admin'
    }
  ];

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

  private validateUser(email: string, password: string): User | null {
    return this.USERS.find(user => 
      user.email === email && user.password === password
    ) || null;
  }

  async onSubmit() {
    this.submitted = true;
    this.loginError = '';

    if (this.loginUsuario.valid) {
      this.isLoading = true;

      try {
        const { email, contrasena } = this.loginUsuario.value;
        const user = this.validateUser(email, contrasena);

        if (user) {
          console.log('Usuario autenticado:', user.email, 'Role:', user.role);
          this.showSuccess = true;
          
          // Guardar información del usuario en localStorage
          localStorage.setItem('userRole', user.role);
          localStorage.setItem('userEmail', user.email);

          // Retardo simulado de 1 segundo
          await new Promise((resolve) => setTimeout(resolve, 1000));

          // Siempre redirigir a home, el header manejará las rutas según el rol
          this.router.navigate(['/']);
        } else {
          this.loginError = 'Credenciales inválidas. Por favor, intente nuevamente.';
        }
      } catch (error) {
        console.error('Error al iniciar sesión:', error);
        this.loginError = 'Error al iniciar sesión. Por favor, intente nuevamente.';
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