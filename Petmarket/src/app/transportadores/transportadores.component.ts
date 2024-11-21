import { Component } from '@angular/core';

import { ProductoComponent } from '../producto/producto.component';

@Component({
  selector: 'app-transportadores',
  standalone: true,
  imports: [ProductoComponent],
  templateUrl: './transportadores.component.html',
  styleUrl: './transportadores.component.css'
})
export class TransportadoresComponent {

}
