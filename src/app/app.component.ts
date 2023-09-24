import { Component } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { authCodeFlowConfig } from './auth.config';
import { StorageService } from './core/services/storage/storage.service';
import userType from './core/models/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Ecommerce-app';

  constructor(
    private oauthService: OAuthService,
    private storageService: StorageService
  ) {
    // login (keycloak) + set user data (storage)
    this.oauthService.configure(authCodeFlowConfig);
    this.oauthService.loadDiscoveryDocumentAndLogin();

    const data = this.oauthService.getIdentityClaims() as any;
    console.log('data: ', data);

    const userData: userType = {
      id: 1,
      email: 'sam@gmail.com',
      fullName: 'sam sam',
      phone: '0540498180',
    };
    this.storageService.onSaveItem('auth-user', data);
  }
}
