import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { MsalService } from '@azure/msal-angular';
import { from } from 'rxjs';
import { switchMap } from 'rxjs/operators';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // Obtener el servicio de MSAL
  const msalService = inject(MsalService);

  // Usar la instancia de MSAL a través del servicio
  const accounts = msalService.instance.getAllAccounts();

  if (accounts.length > 0) {
    return from(
      msalService.instance.acquireTokenSilent({
        scopes: ['user.read'], // Ajusta los scopes según tu aplicación
        account: accounts[0],
      })
    ).pipe(
      switchMap((result) => {
        const clonedReq = req.clone({
          setHeaders: {
            Authorization: `Bearer ${result.account.idToken}`,
          },
        });
        return next(clonedReq);
      })
    );
  }

  return next(req); // Si no hay cuentas activas, envía la solicitud sin token
};
