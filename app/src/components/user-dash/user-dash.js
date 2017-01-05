import template from './user-dash.html';
import styles from './user-dash.scss';

export default {
  template,
  controller,
  bindings: {
    userData: '='   // putting a 2-way binding because I think we want to update this
  }
};

controller.$inject= ['$auth', '$window', 'tokenService', 'ngDialog'];

function controller($auth, window, tokenService, ngDialog) {
  this.styles = styles;

  window.document.cookie = `token=${tokenService.get()}`;
  this.authenticate = provider => {
    $auth.authenticate(provider);
  };

  // this.ghlink = !!(this.userData.ghUsername);
  // this.lilink = !!(this.userData.linkedIn);

  this.updateLinkProfile = () => {
    ngDialog.open({
      template: '<get-linkedin success="success"></get-linkedin>',
      plain: true, 
      width: '90%',
      controller: ['$scope', $scope => {
        $scope.success = () => {
          ngDialog.close();
          return $state.go('userDash');
        };
      }]
    });
  };

}