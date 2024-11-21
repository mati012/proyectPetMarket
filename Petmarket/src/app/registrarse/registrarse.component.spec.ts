import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RegistrarseComponent } from './registrarse.component';

describe('RegistrarseComponent', () => {
  let component: RegistrarseComponent;
  let fixture: ComponentFixture<RegistrarseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        RegistrarseComponent // Component is standalone
      ]
    }).compileComponents();
    
    fixture = TestBed.createComponent(RegistrarseComponent);
    component = fixture.componentInstance;
    component.ngOnInit(); // Explicitly call ngOnInit
    fixture.detectChanges();
  });

  it('deberia crear el componente', () => {
    expect(component).toBeTruthy();
  });

  describe('Form Validation', () => {
    it('deberia validar los compos correspondientes', () => {
      const form = component.registroUsuario;
      expect(form.valid).toBeFalsy();
      
      expect(form.get('nombre')?.errors?.['required']).toBeTruthy();
      expect(form.get('email')?.errors?.['required']).toBeTruthy();
      expect(form.get('contrasena')?.errors?.['required']).toBeTruthy();
    });

    it('deberia enviar un email valido', () => {
      const emailControl = component.registroUsuario.get('email');
      
      emailControl?.setValue('invalid-email');
      expect(emailControl?.errors?.['email']).toBeTruthy();

      emailControl?.setValue('valid@email.com');
      expect(emailControl?.errors?.['email']).toBeFalsy();
    });

    it('deberia validar los formularios', () => {
      const passwordControl = component.registroUsuario.get('contrasena');
      
      passwordControl?.setValue('weak');
      expect(passwordControl?.errors?.['minlength']).toBeTruthy();

      passwordControl?.setValue('weakpassword');
      expect(passwordControl?.errors?.['passwordRequirements']).toBeTruthy();

      passwordControl?.setValue('StrongPass123');
      expect(passwordControl?.valid).toBeTruthy();
    });
  });

  describe('Form Submission', () => {
    it('deberia validar un submit correcto', fakeAsync(() => {
      const validForm = {
        nombre: 'Test User',
        usuario: 'testuser',
        email: 'test@example.com',
        contrasena: 'TestPass123',
        confirmarContrasena: 'TestPass123',
        direccion: 'Test Address',
        fechaNac: '1990-01-01'
      };

      component.registroUsuario.patchValue(validForm);
      component.onSubmit();

      expect(component.isLoading).toBeTrue();
      
      tick(1000);
      
      expect(component.showSuccess).toBeTrue();
      expect(component.isLoading).toBeFalse();
    }));

    it('no deberia hacer un submit en un form invalido', () => {
      component.onSubmit();
      expect(component.registroUsuario.valid).toBeFalse();
      expect(component.isLoading).toBeFalse();
    });
  });

  describe('Validacion de age', () => {
    it('deberia validar una edad minima ', () => {
      const fechaNacControl = component.registroUsuario.get('fechaNac');
      
      const today = new Date();
      const underageDate = new Date(today.getFullYear() - 12, today.getMonth(), today.getDate());
      
      fechaNacControl?.setValue(underageDate.toISOString().split('T')[0]);
      expect(fechaNacControl?.errors?.['minAge']).toBeTruthy();
      
      const validDate = new Date(today.getFullYear() - 15, today.getMonth(), today.getDate());
      fechaNacControl?.setValue(validDate.toISOString().split('T')[0]);
      expect(fechaNacControl?.errors?.['minAge']).toBeFalsy();
    });
  });

  describe('resetear funcionalidades ', () => {
    it('deberia limpiar los campos correctamente ', () => {
      component.registroUsuario.patchValue({
        nombre: 'Test',
        email: 'test@test.com'
      });
      
      component.onReset();
      
      expect(component.registroUsuario.get('nombre')?.value).toBe('');
      expect(component.registroUsuario.get('email')?.value).toBe('');
      expect(component.submitted).toBeFalse();
      expect(component.showSuccess).toBeFalse();
    });
  });
});