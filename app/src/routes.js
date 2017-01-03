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
    abstract: true,
    component: 'signup'
  });

  $stateProvider.state({
    name: 'signin',
    url: '/signin',
    abstract: true,
    component: 'signin'
  });

  $urlRouterProvider.otherwise('/');
}
