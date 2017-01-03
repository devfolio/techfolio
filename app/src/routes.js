routes.$inject = ['$stateProvider', '$urlRouterProvider'];

export default function routes($stateProvider, $urlRouterProvider) {

  $stateProvider.state({
    name: 'home',
    url: '/home',
    component: 'home'
  });

  $stateProvider.state({
    name: 'signup',
    url: '/signup',
    component: 'signup'
  });

  $stateProvider.state({
    name: 'signin',
    url: '/signin',
    component: 'signin'
  });

  $stateProvider.state({
    name: 'about',
    url: '/about',
    component: 'about'
  });

  $stateProvider.state({
    name: 'profile',
    url: '/profile',
    component: 'profile'
  });

  $stateProvider.state({
    name: 'blog',
    url: '/blog',
    component: 'blog'
  });

  $urlRouterProvider.otherwise('/');
}
