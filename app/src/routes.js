routes.$inject = ['$stateProvider', '$urlRouterProvider'];

export default function routes($stateProvider, $urlRouterProvider) {

  $stateProvider.state({
    name: 'home',
    url: '/home',
    abstract: true,
    component: 'home'
  });

  $stateProvider.state({
    name: 'welcome',
    url: '/welcome',
    component: 'welcome',
    data: {
      public: true
    }
  });

  $stateProvider.state({
    name: 'about',
    url: '/about',
    component: 'about',
    data: {
      public: true
    }
  });

  $stateProvider.state({
    name: 'userDash',
    url: '/user',
    resolve: {
      userData: ['userService', userService => {
        return userService.getProfile();
      }]
    },
    component: 'userDash'
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
