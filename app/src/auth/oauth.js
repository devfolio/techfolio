oauth.$inject = ['$authProvider', 'apiUrl'];

export default function oauth($authProvider, apiUrl) {
  $authProvider.httpInterceptor = function() { return true; };

  const url = `${apiUrl}/github`;
  $authProvider.github({
    url,
    clientId: '19c715da69eda6573929',
    redirectUri: url
  });
}