import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ProductoComponent } from "./producto/producto.component";
import { HttpClientModule } from '@angular/common/http';
import { CartComponent } from './cart/cart.component';
@Component({
  selector: 'app-root',  // Ensure this matches the tag in index.html
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, FooterComponent, ProductoComponent, HttpClientModule, CartComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Petmarket';

}
