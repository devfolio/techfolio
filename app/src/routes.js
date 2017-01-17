routes.$inject = ['$stateProvider', '$urlRouterProvider'];

export default function routes($stateProvider, $urlRouterProvider) {

  $stateProvider.state({
    name: 'home',
    url: '/',
    data: {
      public: true
    },
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
    name: 'userProfiles',
    url: '/users/:userUrl',
    resolve: {
      userUrl: ['$transition$', t => t.params().userUrl],
      profile: ['userService', 'userUrl', (userService, userUrl) => {
        return userService.getPublicProfile(userUrl);
      }]
    },
    data: {
      public: true
    },
    component: 'publicProfile'
  });

  $stateProvider.state({
    name: 'userDash',
    url: '/dashboard',
    resolve: {
      userData: ['userService', userService => {
        return userService.getProfile();
      }]
    },
    component: 'userDash'
  });

  $stateProvider.state({
    name: 'blog',
    url: '/blog',
    component: 'blog'
  });
  
  $urlRouterProvider.otherwise('/');
}
