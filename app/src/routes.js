routes.$inject = ['$stateProvider', '$urlRouterProvider'];

export default function routes($stateProvider, $urlRouterProvider) {

  $stateProvider.state({
    name: 'welcome',
    url: '/welcome',
    component: 'welcome'
  });

  $stateProvider.state({
    name: 'userDash',
    url: '/user',
    template: '<p>Im in the user dash</p>'
  });


  $urlRouterProvider.otherwise('/');
}
