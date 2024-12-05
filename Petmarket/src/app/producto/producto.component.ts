import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface Producto {
  id: number;
  name: string;
  price: string;
  imageUrl: string;
  description: string;
  rating: number;
  descuento: boolean;
  category: 'comida' | 'juguetes' | 'transportadores';
}

@Component({
  selector: 'app-producto',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css'],
})
export class ProductoComponent {
  @Input() category: 'comida' | 'juguetes' | 'transportadores' | null = null;

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
      description: 'caja de sobres de la edición modern horizon 3',
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
      description: 'Cuerda especializada para entrenar perros',
      rating: 4,
      descuento: false,
      category: 'juguetes',
    },
  ];

  carrito: Producto[] = [];

  constructor(private router: Router) {}

  addToCart(product: Producto) {
    const productoEnCarrito = this.carrito.find((item) => item.id === product.id);
    if (productoEnCarrito) {
      alert('Este producto ya está en el carrito.');
    } else {
      this.carrito.push(product);
      alert(`${product.name} fue añadido al carrito.`);
    }
  }

  goToProductDetail(productId: number) {
    this.router.navigate(['/product', productId]);
  }

  get filteredProductos(): Producto[] {
    return this.category
      ? this.productos.filter((producto) => producto.category === this.category)
      : this.productos;
  }

  showCartItems() {
    console.log('Carrito:', this.carrito);
    alert(`Tienes ${this.carrito.length} productos en el carrito.`);
  }
}
