import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { ProductoComponent } from "../producto/producto.component";
import { FooterComponent } from "../footer/footer.component";
import { CartComponent } from '../cart/cart.component';

@Component({
  selector: 'app-juguetes',
  standalone: true,
  imports: [HeaderComponent, ProductoComponent, FooterComponent, CartComponent],
  templateUrl: './juguetes.component.html',
  styleUrl: './juguetes.component.css'
})
export class JuguetesComponent {

}
