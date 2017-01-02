routes.$inject = ['$stateProvider', '$urlRouterProvider'];

export default function routes($stateProvider, $urlRouterProvider) {
  $stateProvider.state({
    name: 'welcome',
    url: '/welcome',
    component: 'welcome'
  });

  $stateProvider.state({
    name: 'signup',
    url: '/signup',
    component: 'signup'
  });
  $urlRouterProvider.otherwise('/');
}
