import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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
  selector: 'app-editar-producto',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './editar-producto.component.html',
  styleUrls: ['./editar-producto.component.css']
})
export class EditarProductoComponent {
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
      price: '$69.990',
      imageUrl: '/assets/orijen.jpg',
      description: 'comida especializada para perros',
      rating: 4,
      descuento: false,
      category: 'comida',
    },
    {
      id: 3,
      name: 'Canil',
      price: '$39.990',
      imageUrl: '/assets/canilPerro.jpg',
      description: 'Canil especializado para perros dimensiones medianas',
      rating: 4,
      descuento: false,
      category: 'transportadores',
    }
  ];

  selectedProduct: Producto | null = null;
  showForm = false;

  editProduct(product: Producto): void {
    this.selectedProduct = { ...product };
    this.showForm = true;
  }

  deleteProduct(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      this.productos = this.productos.filter(p => p.id !== id);
    }
  }

  onSubmit(): void {
    if (this.selectedProduct) {
      const index = this.productos.findIndex(p => p.id === this.selectedProduct!.id);
      if (index !== -1) {
        this.productos[index] = { ...this.selectedProduct };
      }
      this.cancelEdit();
    }
  }

  cancelEdit(): void {
    this.selectedProduct = null;
    this.showForm = false;
  }
}