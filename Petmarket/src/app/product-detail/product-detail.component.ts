import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

interface Producto {
  id: number;
  name: string;
  price: string;
  imageUrl: string;
  description: string;
  rating: number;
  descuento: boolean;
  category: string;
}

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit {
  product: Producto | null = null;

  productos: Producto[] = [
    {
      id: 1,
      name: 'acana',
      price: '$49.990',
      imageUrl: '/assets/acana.jpg',
      description: 'Comida especializada para gatos',
      rating: 4.5,
      descuento: false,
      category: 'comida',
    },
    {
      id: 2,
      name: 'origen',
      price: '$69.990 ',
      imageUrl: '/assets/orijen.jpg',
      description: 'comida especializada para perros',
      rating: 4,
      descuento: false,
      category: 'comida',
    },
    {
      id: 3,
      name: 'Canil',
      price: '$39.990 ',
      imageUrl: '/assets/canilPerro.jpg',
      description: 'Canil especializado para perros dimensiones medianas',
      rating: 4,
      descuento: false,
      category: 'transportadores',
    },

    {
      id: 4,
      name: 'Mochila',
      price: '$29.990 ',
      imageUrl: '/assets/canilGato.jpg',
      description: 'caja de sobres de la edicion modern horizon 3',
      rating: 4,
      descuento: false,
      category: 'transportadores',
    },

    {
      id: 5,
      name: 'hueso de hule',
      price: '$9.990 ',
      imageUrl: '/assets/juguetePerro.png',
      description: 'Hueso de hule especializado para perros',
      rating: 4,
      descuento: false,
      category: 'juguetes',
    },
    {
      id: 6,
      name: 'Cuerda entrenadora',
      price: '$69.990 ',
      imageUrl: '/assets/cuerdas.jpg',
      description: 'cuerda especializada para entrenar perros',
      rating: 4,
      descuento: false,
      category: 'juguetes',
    },
  
  ];

  messages: string[] = [];

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.product = this.productos.find((p) => p.id === parseInt(id, 10)) || null;
    }
  }

  addMessage(message: string) {
    if (message) {
      this.messages.push(message);
    }
  }
}
