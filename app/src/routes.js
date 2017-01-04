routes.$inject = ['$stateProvider', '$urlRouterProvider'];

export default function routes($stateProvider, $urlRouterProvider) {

  $stateProvider.state({
    name: 'home',
    url: '/',
    component: 'welcome'
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
    component: 'profile',
    resolve: {
      linkedIn: [ () => { return {}; } ]
    }
  });

  $stateProvider.state({
    name: 'blog',
    url: '/blog',
    component: 'blog'
  });

  $urlRouterProvider.otherwise('/');
}
