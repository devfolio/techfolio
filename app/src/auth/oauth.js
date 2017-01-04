oauth.$inject = ['$authProvider', 'apiUrl'];

export default function oauth($authProvider, apiUrl) {

  // $authProvider.httpInterceptor = () => {return false;};
  $authProvider.withCredentials = true;

  $authProvider.github({
    // httpInterceptor: false,
    url: `${apiUrl}/github/`,
    clientId: '19c715da69eda6573929',
    redirectUri: `${apiUrl}/github/`,
  });

  $authProvider.linkedin({
    url: `${apiUrl}/linkedin/`,
    clientId: '19c715da69eda6573929',
    redirectUri: `${apiUrl}/linkedin/`,
    state: 'Devfolio'
  });
}