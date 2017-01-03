auth.$inject = ['$rootScope', '$state', 'ngDialog', 'tokenService'];

export default function auth($rootScope, $state, ngDialog, tokenService) {

  $rootScope.$on('$stateChangeStart', (event, toState, toParams) => {
    if(!tokenService.get()) { // if they don't have a token
      event.preventDefault(); // don't go to the route

      const dialog = ngDialog.open({
        template: '<user-auth success="success"><user-auth>',
        plain: true,           // used for template, instead of templateUrl
        controller: ['$scope', $scope => {
          $scope.success = () => {
            dialog.close();
            return $state.go(toState.name, toParams);
          };
        }]
      });
    }
  });
}