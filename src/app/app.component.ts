import { Component, Inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LayoutComponent } from "./layout/layout.component";
import { MSAL_INSTANCE, MsalService } from '@azure/msal-angular';
import { Store } from '@ngrx/store';
import { login } from './store/session/session.reducer';
import { PublicClientApplication } from '@azure/msal-browser';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'cloud-native-front';
  constructor(private msalService: MsalService, private store: Store) {}

  ngOnInit() {
    // Verificar cuentas activas en MSAL
    const accounts = this.msalService.instance.getAllAccounts();

    if (accounts.length > 0) {
      // Si hay cuentas activas, sincronizar el estado global
      const account = accounts[0]; // Puedes ajustar para manejar múltiples cuentas si es necesario
      this.store.dispatch(
        login({
          user: {
            id: account.localAccountId,
            name: account.name,
            email: account.username,
            role: 'ROLE_USER', // Ajustar si usas roles
          },
        })
      );
      console.log('Sesión sincronizada con cuentas activas:', account);
    } else {
      console.log('No hay cuentas activas, redirigiendo al login.');
      this.msalService.instance.loginRedirect({
        scopes: ['user.read'], // Ajustar los scopes según sea necesario
      });
    }
  }
}
