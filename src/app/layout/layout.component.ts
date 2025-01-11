import { Component, HostListener } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-layout',
  standalone: true,
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  imports: [
    CommonModule,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
  ],
})
export class LayoutComponent {
  isSidenavOpen = true;
  sidenavMode: 'side' | 'over' = 'side';

  constructor() {
    this.updateSidenavMode(window.innerWidth); // Configuración inicial
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    const width = (event.target as Window).innerWidth;
    this.updateSidenavMode(width);
  }

  updateSidenavMode(width: number) {
    if (width < 768) {
      this.sidenavMode = 'over'; // Modo móvil: sidenav cubre el contenido
      this.isSidenavOpen = false; // Inicialmente cerrado en pantallas pequeñas
    } else {
      this.sidenavMode = 'side'; // Modo escritorio: sidenav empuja el contenido
      this.isSidenavOpen = true; // Abierto en pantallas grandes
    }
  }

  onSidenavToggle(isOpened: boolean) {
    this.isSidenavOpen = isOpened; // Mantiene el estado sincronizado
  }
}
