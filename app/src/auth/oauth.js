/* global window */

oauth.$inject = ['$authProvider', 'apiUrl'];

export default function oauth($authProvider, apiUrl) {

  const currentLocation = window.location.origin;

  $authProvider.github({
    url: `${apiUrl}/github/`,
    clientId: process.env.GITHUB_CLIENTID,
    redirectUri: `${currentLocation}/github/`
  });

  $authProvider.linkedin({
    url: `${apiUrl}/linkedin/`,
    authorizationEndpoint: 'https://www.linkedin.com/oauth/v2/authorization',
    clientId: process.env.LINKEDIN_CLIENTID,
    redirectUri: 'https://techfolio.herokuapp.com/linkedin/',
    state: 'Devfolio'
  });
}