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
    name: 'userProfiles',
    url: '/user/:userUrl',
    resolve: {
      userUrl: ['$transition$', t => t.params().userUrl],
      userProfile: ['userService', 'userUrl', (userService, userUrl) => {
        return userService.getPublicProfile(userUrl);
      }]
    },
    data: {
      public: true
    }
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
    name: 'userDash.linkedIn',
    url: '/linkedIn',
    abstract: true,
    component: 'linkedIn'
  });

  $stateProvider.state({
    name: 'userDash.github',
    url: '/github',
    abstract: true,
    component: 'github'
  });

  $stateProvider.state({
    name: 'blog',
    url: '/blog',
    component: 'blog'
  });



  $urlRouterProvider.otherwise('/');
}
