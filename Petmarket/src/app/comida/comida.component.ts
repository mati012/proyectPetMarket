import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { ProductoComponent } from '../producto/producto.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-comida',
  standalone: true,
  imports: [HeaderComponent, ProductoComponent, FooterComponent],
  templateUrl: './comida.component.html',
  styleUrl: './comida.component.css'
})
export class ComidaComponent {

}
