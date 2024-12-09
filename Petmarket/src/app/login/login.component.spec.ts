import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, LoginComponent],
      providers: [{ provide: Router, useValue: spy }],
    }).compileComponents();

    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('validacion del form', () => {
    const form = component.loginUsuario;

    expect(form.valid).toBeFalsy();

    form.patchValue({
      email: 'invalidemail',
      contrasena: '',
    });

    expect(form.get('email')?.hasError('email')).toBeTruthy();
    expect(form.get('contrasena')?.hasError('required')).toBeTruthy();

    form.patchValue({
      email: 'mati@gmail.com',
      contrasena: 'Mati0123',
    });

    expect(form.valid).toBeTruthy();
  });

  it('login correcto con credenciales', fakeAsync(() => {
    component.loginUsuario.patchValue({
      email: 'mati@gmail.com',
      contrasena: 'Mati0123',
    });

    spyOn(localStorage, 'setItem');

    component.onSubmit();
    tick(1000);

    expect(component.showSuccess).toBeTruthy();
    expect(localStorage.setItem).toHaveBeenCalledWith('userRole', 'user');
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'userEmail',
      'mati@gmail.com'
    );
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/']);
  }));

  it('should show error for invalid credentials', fakeAsync(() => {
    component.loginUsuario.patchValue({
      email: 'wrong@gmail.com',
      contrasena: 'wrongpassword',
    });

    component.onSubmit();
    tick(1000);

    expect(component.loginError).toBe(
      'Credenciales inválidas. Por favor, intente nuevamente.'
    );
    expect(component.showSuccess).toBeFalsy();
  }));

  it('should reset form correctly', () => {
    component.loginUsuario.patchValue({
      email: 'test@gmail.com',
      contrasena: 'password123',
    });
    component.submitted = true;
    component.showSuccess = true;
    component.loginError = 'Some error';

    component.onReset();

    expect(component.submitted).toBeFalsy();
    expect(component.showSuccess).toBeFalsy();
    expect(component.loginError).toBe('');
    expect(component.loginUsuario.value).toEqual({
      email: null,
      contrasena: null,
    });
  });
});
