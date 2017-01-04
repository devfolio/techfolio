oauth.$inject = ['$authProvider', 'apiUrl'];

export default function oauth($authProvider, apiUrl) {

  // $authProvider.httpInterceptor = () => {return false;};
  $authProvider.withCredentials = true;
  const currentLocation = window.location.origin;

  $authProvider.github({
    // httpInterceptor: false,
    url: `${apiUrl}/github/`,
    clientId: '19c715da69eda6573929',
    redirectUri: `${currentLocation}/github/`,
  });

  $authProvider.linkedin({
    url: `${apiUrl}/linkedin/`,
    authorizationEndpoint: 'https://www.linkedin.com/oauth/v2/authorization',
    clientId: '86xdssak7j3wxb',
    redirectUri: `${apiUrl}/linkedin/`,
    state: 'Devfolio'
  });
}