import { Component, OnInit } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { StorageService } from '../../services/storage/storage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  isLogged = false;

  constructor(
    private oauthService: OAuthService,

    private storageService: StorageService
  ) {
    // this.oauthService.events
    //   .pipe(filter((e) => e.type === 'token_received'))
    //   .subscribe((_) => {
    //     // @ts-ignore
    //     this.name = this.oauthService.getIdentityClaims()['name'];
    //   });
    // if (this.oauthService.hasValidIdToken()) {
    //   // @ts-ignore
    //   this.name = this.oauthService.getIdentityClaims()['name'];
    // }
  }

  ngOnInit(): void {}

  onLogout() {
    // logout (keycloak) + remove user data (storage)
    this.oauthService.logOut();
    this.storageService.onRemoveItem('auth-user');
  }
}
