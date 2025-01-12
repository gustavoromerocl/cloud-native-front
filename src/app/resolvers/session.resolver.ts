import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import { Store } from '@ngrx/store';
import { login } from '../store/session/session.reducer';

@Injectable({ providedIn: 'root' })
export class SessionResolver implements Resolve<void> {
  constructor(private msalService: MsalService, private store: Store) {}

  resolve() {
    const accounts = this.msalService.instance.getAllAccounts();
    if (accounts.length > 0) {
      const account = accounts[0];
      this.store.dispatch(
        login({
          user: {
            id: account.localAccountId,
            name: account.name,
            email: account.username,
            role: 'ROLE_USER',
          },
        })
      );
    }
  }
}
