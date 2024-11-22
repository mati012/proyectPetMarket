import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Usuario {
  id: number;
  nombre: string;
  email: string;
  telefono: string;
  direccion: string;
  fechaRegistro: string;
  ultimaCompra?: string;
  mascota: {
    tipo: 'perro' | 'gato' | 'otro';
    nombre: string;
    edad: number;
  };
}

@Component({
  selector: 'app-editar-usuario',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.css']
})
export class EditarUsuarioComponent {
  // Datos de ejemplo
  datosUsuario: Usuario = {
    id: 1,
    nombre: 'Matías González',
    email: 'mati@gmail.com',
    telefono: '+569 12345678',
    direccion: 'Av. Providencia 1234, Santiago',
    fechaRegistro: '2024-01-15',
    ultimaCompra: '2024-03-10',
    mascota: {
      tipo: 'perro',
      nombre: 'Rocky',
      edad: 3
    }
  };

  showForm = false;
  editingPerfil = false;
  editingMascota = false;

  editarPerfil(): void {
    this.editingPerfil = true;
    this.showForm = true;
    this.editingMascota = false;
  }

  editarMascota(): void {
    this.editingMascota = true;
    this.showForm = true;
    this.editingPerfil = false;
  }

  onSubmit(): void {
    // Aquí iría la lógica para guardar los cambios
    // Por ahora solo cerramos el formulario
    this.showForm = false;
    this.editingPerfil = false;
    this.editingMascota = false;
    alert('Cambios guardados con éxito');
  }

  cancelEdit(): void {
    this.showForm = false;
    this.editingPerfil = false;
    this.editingMascota = false;
  }
}