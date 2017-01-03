routes.$inject = ['$stateProvider', '$urlRouterProvider'];

export default function routes($stateProvider, $urlRouterProvider) {

  $stateProvider.state({
    name: 'home',
    url: '/home',
    component: 'home'
  });

  $stateProvider.state({
    name: 'userDash',
    url: '/user',
    template: '<p>Im in the user dash</p>'
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
