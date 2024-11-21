import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';


@Component({
  selector: 'app-registrarse',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './registrarse.component.html',
  styleUrl: './registrarse.component.css',
})
export class RegistrarseComponent implements OnInit {
  registroUsuario!: FormGroup;
  submitted = false;
  isLoading = false;
  showSuccess = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.registroUsuario = this.fb.group(
      {
        nombre: ['', [Validators.required]],
        usuario: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        contrasena: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(18),
            this.passwordValidator(),
          ],
        ],
        confirmarContrasena: ['', [Validators.required]],
        direccion: [''],
        fechaNac: ['', [Validators.required, this.ageValidator()]],
      },
      {
        validators: this.passwordMatchValidator,
      }
    );
  }

  passwordValidator() {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (!value) return null;

      const hasNumber = /[0-9]/.test(value);
      const hasUpperCase = /[A-Z]/.test(value);

      const passwordValid = hasNumber && hasUpperCase;

      return !passwordValid ? { passwordRequirements: true } : null;
    };
  }

  ageValidator() {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null;

      const fechaNac = new Date(control.value);
      const today = new Date();
      let age = today.getFullYear() - fechaNac.getFullYear();

      const monthDiff = today.getMonth() - fechaNac.getMonth();
      if (
        monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < fechaNac.getDate())
      ) {
        age--;
      }

      return age < 13 ? { minAge: true } : null;
    };
  }

  passwordMatchValidator(group: AbstractControl): ValidationErrors | null {
    const password = group.get('contrasena')?.value;
    const confirmPassword = group.get('confirmarContrasena')?.value;

    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  getErrorMessage(controlName: string): string {
    const control = this.registroUsuario.get(controlName);
    if (!control) return '';

    if (control.hasError('required')) return 'Este campo es requerido';
    if (control.hasError('email')) return 'Email inválido';
    if (control.hasError('minlength'))
      return 'La contraseña debe tener al menos 6 caracteres';
    if (control.hasError('maxlength'))
      return 'La contraseña no puede tener más de 18 caracteres';
    if (control.hasError('passwordRequirements'))
      return 'La contraseña debe contener al menos un número y una mayúscula';
    if (control.hasError('minAge'))
      return 'Debes tener al menos 13 años para registrarte';

    return '';
  }

  async onSubmit() {
    this.submitted = true;

    if (this.registroUsuario.valid) {
      this.isLoading = true;

      try {
        console.log('Formulario enviado:', this.registroUsuario.value);

        await new Promise((resolve) => setTimeout(resolve, 1000));

        this.showSuccess = true;
        this.registroUsuario.reset();
        this.submitted = false;

        setTimeout(() => {
          this.showSuccess = false;
        }, 3000);
      } catch (error) {
        console.error('Error al registrar:', error);
      } finally {
        this.isLoading = false;
      }
    } else {
      Object.keys(this.registroUsuario.controls).forEach((key) => {
        const control = this.registroUsuario.get(key);
        if (control?.errors) {
          console.log(`${key} errors:`, control.errors);
        }
      });
    }
  }

  onReset() {
    this.submitted = false;
    this.registroUsuario.reset({
      nombre: '',
      usuario: '',
      email: '',
      contrasena: '',
      confirmarContrasena: '',
      direccion: '',
      fechaNac: '',
    });
    this.showSuccess = false;
  }
}
