import Keycloak from 'keycloak-js';

const keycloakConfig = new Keycloak({
  url: 'http://10.0.8.129:8080/',
  realm: 'KSGAAL',
  clientId: 'GatewayApp',
  // comment this for now till ask Salah
  // 'check-sso-interval': 30000,
});

export default keycloakConfig;
