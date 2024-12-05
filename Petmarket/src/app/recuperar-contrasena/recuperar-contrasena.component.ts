import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-recuperar-contrasena',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './recuperar-contrasena.component.html',
  styleUrl: './recuperar-contrasena.component.css',
})
export class RecuperarContrasenaComponent implements OnInit {
  recuperarForm!: FormGroup;
  submitted = false;
  isLoading = false;
  showSuccess = false;
  errorMessage = '';

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.recuperarForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  getErrorMessage(controlName: string): string {
    const control = this.recuperarForm.get(controlName);
    if (!control) return '';

    if (control.hasError('required')) return 'Este campo es requerido';
    if (control.hasError('email')) return 'Email inválido';

    return '';
  }

  async onSubmit() {
    this.submitted = true;
    this.errorMessage = '';

    if (this.recuperarForm.valid) {
      this.isLoading = true;

      try {
        // Simulamos el envío del email con un retardo
        await new Promise((resolve) => setTimeout(resolve, 1000));
        this.showSuccess = true;
        this.errorMessage = '';
        
        // Aquí iría la lógica real para enviar el email de recuperación
        console.log('Email de recuperación enviado a:', this.recuperarForm.value.email);
        await new Promise((resolve) => setTimeout(resolve, 3000));
        this.router.navigate(['/']);
        
      } catch (error) {
        console.error('Error al enviar email:', error);
        this.errorMessage = 'Error al enviar el email. Por favor, intente nuevamente.';
      } finally {
        this.isLoading = false;
      }
    }
  }

  onReset() {
    this.submitted = false;
    this.recuperarForm.reset();
    this.showSuccess = false;
    this.errorMessage = '';
  }
}