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
          import('./pages/dashboard/dashboard.component').then((m) => m.DashboardComponent),
        pathMatch: 'full',
      },
      {
        path: 'patients',
        loadComponent: () =>
          import('./pages/patient/patient.component').then((m) => m.PatientComponent),
      },
      {
        path: 'alerts',
        loadComponent: () =>
          import('./pages/alert/alert.component').then((m) => m.AlertComponent),
      },
    ],
  },
  {
    path: '**',
    redirectTo: '', // Redirige cualquier ruta no encontrada al home
  },
];
