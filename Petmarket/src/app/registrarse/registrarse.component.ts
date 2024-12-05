

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
/**
 * @description
 * Componente de registro de usuarios que implementa un formulario reactivo con validaciones
 * avanzadas. Este componente permite a los nuevos usuarios registrarse en la aplicación
 * proporcionando información personal básica y credenciales de acceso.
 * 
 * El componente incluye:
 * - Validación de contraseña con requisitos específicos (mayúsculas y números)
 * - Verificación de edad mínima (13 años)
 * - Validación de coincidencia de contraseñas
 * - Manejo de estados de carga y éxito
 * - Reinicio de formulario
 * 
 * @usageNotes
 * ### Importación
 * ```typescript
 * import { RegistrarseComponent } from './registrarse/registrarse.component';
 * ```
 * 
 * ### Uso en template
 * ```html
 * <app-registrarse></app-registrarse>
 * ```
 * 

 * ### Requisitos de contraseña
 * - Mínimo 6 caracteres
 * - Máximo 18 caracteres
 * - Al menos una letra mayúscula
 * - Al menos un número
 * 
 * ### Validaciones implementadas
 * - Email válido
 * - Edad mínima de 13 años
 * - Campos requeridos
 * - Coincidencia de contraseñas
 */
@Component({
  selector: 'app-registrarse',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './registrarse.component.html',
  styleUrl: './registrarse.component.css',
})
export class RegistrarseComponent implements OnInit {
  /**
   * Formulario reactivo que gestiona los datos del registro.
   * Contiene los siguientes campos:
   * - nombre: string
   * - usuario: string
   * - email: string
   * - contrasena: string
   * - confirmarContrasena: string
   * - direccion: string
   * - fechaNac: Date
   * @type {FormGroup}
   */
  registroUsuario!: FormGroup;

  /**
   * Indica si el formulario ha sido enviado.
   * Se utiliza para mostrar errores de validación solo después del primer intento de envío.
   * @type {boolean}
   * @default false
   */
  submitted = false;

  /**
   * Indica si hay una operación de registro en proceso.
   * Se utiliza para mostrar indicadores de carga y deshabilitar el botón de envío.
   * @type {boolean}
   * @default false
   */
  isLoading = false;

  /**
   * Indica si se debe mostrar el mensaje de éxito después del registro.
   * El mensaje se muestra por 3 segundos.
   * @type {boolean}
   * @default false
   */
  showSuccess = false;

  /**
   * Constructor del componente.
   * @param {FormBuilder} fb - Servicio para la construcción de formularios reactivos
   */
  constructor(private fb: FormBuilder) {}

  /**
   * Inicializa el formulario reactivo con sus campos y validaciones.
   * Se ejecuta automáticamente cuando el componente es inicializado.
   * Configura todas las validaciones iniciales y los valores por defecto.
   */
  ngOnInit(): void {
    this.registroUsuario = this.fb.group(
      {
        nombre: ['', [Validators.required, this.nombreValidator()]],
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

  /**
   * Validador personalizado para verificar los requisitos de la contraseña.
   * Verifica que la contraseña contenga al menos un número y una letra mayúscula.
   * 
   * @returns {Function} Función validadora que retorna un objeto de error o null
   */
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

  /**
   * Validador personalizado para verificar la edad mínima del usuario.
   * Calcula la edad basada en la fecha de nacimiento y verifica que sea mayor a 13 años.
   * 
   * @returns {Function} Función validadora que retorna un objeto de error o null
   */
  ageValidator() {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null;

      const fechaNac = new Date(control.value);
      const today = new Date();
      
      // Validar fecha mínima (año 1900)
      const minDate = new Date('1900-01-01');
      if (fechaNac < minDate) {
        return { invalidDate: true };
      }

      // Validar que no sea fecha futura
      if (fechaNac > today) {
        return { futureDate: true };
      }

      // Calcular edad
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
  /**
   * Validador personalizado para verificar el no uso de caracteres especiales en el nombre.
   * 
   * 
   *
   */

  nombreValidator() {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (!value) return null;

      // Verifica si contiene números o caracteres especiales
      const hasNumbersOrSpecialChars = /[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/.test(value);

      return hasNumbersOrSpecialChars ? { invalidName: true } : null;
    };
  }

  /**
   * Validador personalizado para verificar que las contraseñas coincidan.
   * Compara los valores de los campos 'contrasena' y 'confirmarContrasena'.
   * 
   * @param {AbstractControl} group - Grupo de controles del formulario
   * @returns {ValidationErrors | null} Objeto de error si no coinciden, null si coinciden
   */
  passwordMatchValidator(group: AbstractControl): ValidationErrors | null {
    const password = group.get('contrasena')?.value;
    const confirmPassword = group.get('confirmarContrasena')?.value;

    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  /**
   * Obtiene el mensaje de error correspondiente para un campo específico.
   * 
   * @param {string} controlName - Nombre del control del formulario
   * @returns {string} Mensaje de error específico para el tipo de validación fallida
   */
  getErrorMessage(controlName: string): string {
    const control = this.registroUsuario.get(controlName);
    if (!control) return '';

    if (control.hasError('required')) return 'Este campo es requerido';
    if (control.hasError('email')) return 'Email inválido';
    if (control.hasError('minlength'))
      return 'La contraseña debe tener al menos 6 caracteres';
    if (control.hasError('invalidName'))
      return 'El nombre solo puede contener letras y espacios';
    if (control.hasError('maxlength'))
      return 'La contraseña no puede tener más de 18 caracteres';
    if (control.hasError('passwordRequirements'))
      return 'La contraseña debe contener al menos un número y una mayúscula';
    if (control.hasError('minAge'))
      return 'Debes tener al menos 13 años para registrarte';
    if (control.hasError('invalidDate'))
      return 'La fecha de nacimiento no puede ser anterior a 1900';
    if (control.hasError('futureDate'))
      return 'La fecha de nacimiento no puede ser futura';

    return '';
  }

  /**
   * Maneja el envío del formulario.
   * Valida el formulario completo y procesa los datos si es válido.
   * Implementa un retraso simulado de 1 segundo para demostrar el estado de carga.
   * Muestra un mensaje de éxito por 3 segundos si el registro es exitoso.
   * 
   * @returns {Promise<void>}
   */
  async onSubmit() {
    this.submitted = true;

    if (this.registroUsuario.valid) {
      this.isLoading = true;

      try {
        console.log('Formulario enviado:', this.registroUsuario.value);

        // Simulación de llamada al servidor
        await new Promise((resolve) => setTimeout(resolve, 1000));

        this.showSuccess = true;
        this.registroUsuario.reset();
        this.submitted = false;

        // Ocultar mensaje de éxito después de 3 segundos
        setTimeout(() => {
          this.showSuccess = false;
        }, 3000);
      } catch (error) {
        console.error('Error al registrar:', error);
      } finally {
        this.isLoading = false;
      }
    } else {
      // Log de errores en consola para depuración
      Object.keys(this.registroUsuario.controls).forEach((key) => {
        const control = this.registroUsuario.get(key);
        if (control?.errors) {
          console.log(`${key} errors:`, control.errors);
        }
      });
    }
  }

  /**
   * Reinicia el formulario a su estado inicial.
   * Limpia todos los campos y estados del formulario.
   * Reinicia los estados de submitted y showSuccess.
   */
  onReset(): void {
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