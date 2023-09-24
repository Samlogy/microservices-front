import { AuthConfig } from 'angular-oauth2-oidc';

export const authCodeFlowConfig: AuthConfig = {
  issuer: 'http://localhost:10000/auth/realms/monolithic-realm',
  redirectUri: window.location.origin,
  clientId: 'monolithic-front',
  responseType: 'code',
  logoutUrl:
    'http://localhost:10000/auth/realms/monolithic-realm/protocol/openid-connect/logout',
  postLogoutRedirectUri: window.location.origin,
  showDebugInformation: true,
  requireHttps: false,
};
