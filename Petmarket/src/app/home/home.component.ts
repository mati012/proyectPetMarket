import { Component } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { ProductoComponent } from '../producto/producto.component';
import { RegistrarseComponent } from '../registrarse/registrarse.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ProductoComponent, RegistrarseComponent, LoginComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
