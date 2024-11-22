import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isMenuOpen = false;
  isLoggedIn = false;
  isAdmin = false;
  isUser = false;
  private isBrowser: boolean;

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit() {
    if (this.isBrowser) {
      // Verificar estado inicial
      this.checkUserStatus();

      // Verificar en cada cambio de ruta
      this.router.events.pipe(
        filter(event => event instanceof NavigationEnd)
      ).subscribe(() => {
        this.checkUserStatus();
      });

      // Verificar cada segundo (opcional, por si los cambios no se detectan)
      setInterval(() => {
        this.checkUserStatus();
      }, 1000);
    }
  }

  checkUserStatus() {
    if (this.isBrowser) {
      const userRole = localStorage.getItem('userRole');
      const userEmail = localStorage.getItem('userEmail');
      
      this.isLoggedIn = !!userRole && !!userEmail;
      this.isAdmin = userRole === 'admin';
      this.isUser = userRole === 'user';
    }
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  logout() {
    if (this.isBrowser) {
      // Limpiar localStorage
      localStorage.removeItem('userRole');
      localStorage.removeItem('userEmail');
      
      // Resetear estados
      this.isLoggedIn = false;
      this.isAdmin = false;
      this.isUser = false;
      
      // Cerrar menú si está abierto
      this.isMenuOpen = false;
      
      // Redirigir al inicio
      this.router.navigate(['/']).then(() => {
        // Forzar recarga del estado
        this.checkUserStatus();
        // Opcional: recargar la página para asegurar reset completo
        window.location.reload();
      });
    }
  }
}