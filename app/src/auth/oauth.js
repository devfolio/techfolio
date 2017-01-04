oauth.$inject = ['$authProvider', 'apiUrl'];

export default function oauth($authProvider, apiUrl) {

  // $authProvider.httpInterceptor = () => {return false;};
  $authProvider.withCredentials = true;

  const url = `${apiUrl}/github/`;
  $authProvider.github({
    // httpInterceptor: false,
    url,
    clientId: '19c715da69eda6573929',
    redirectUri: url,
    withCredentials: true
  });
}