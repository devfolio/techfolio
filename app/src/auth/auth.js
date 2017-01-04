auth.$inject = ['$rootScope', '$state', 'ngDialog', 'tokenService'];

export default function auth($rootScope, $state, ngDialog, tokenService) {

  $rootScope.$on('$stateChangeStart', (event, toState, toParams) => {
    // if not a public route or they don't have a token
    if(!(toState.data && toState.data.public) && !tokenService.get()) {
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