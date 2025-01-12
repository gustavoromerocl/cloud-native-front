import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { MsalGuard } from '@azure/msal-angular';
import { SessionResolver } from './resolvers/session.resolver';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent, // El layout es el componente principal
    resolve: {
      session: SessionResolver // Resuelve el session storage antes de cargar el layout
    },
    canActivate: [MsalGuard],
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./pages/home/home.component').then((m) => m.HomeComponent),
        pathMatch: 'full',
      },
      {
        path: 'about',
        loadComponent: () =>
          import('./pages/about/about.component').then((m) => m.AboutComponent),
      },
      {
        path: 'contact',
        loadComponent: () =>
          import('./pages/contact/contact.component').then((m) => m.ContactComponent),
      },
    ],
  },
  {
    path: '**',
    redirectTo: '', // Redirige cualquier ruta no encontrada al home
  },
];
