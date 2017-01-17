import template from './user-dash.html';
import styles from './user-dash.scss';

export default {
  template,
  controller,
  bindings: {
    userData: '=',
  }
};

controller.$inject= ['$auth', '$window', 'tokenService', 'ngDialog', '$state', 'githubService'];

function controller($auth, window, tokenService, ngDialog, $state, githubService) {
  this.styles = styles;

  this.savedLink = {};

  window.document.cookie = `token=${tokenService.get()}`;
  this.authenticate = provider => {
    $auth.authenticate(provider);
  };

  this.$onInit = () => {
    githubService.getProfile()
      .then(profile => {
        this.profile = profile;
      });
  };

  // nice use of integrating ngDialog...
  this.personalForm = () => {
    ngDialog.open({
      template: '<personal-info success="success"></personal-info>',
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

  this.updateLinkProfile = () => {
    ngDialog.open({
      template: '<get-linkedin success="success" saved-link="ngDialogData"></get-linkedin>',
      plain: true, 
      width: '90%',
      data: this.savedLink,
      controller: ['$scope', $scope => {
        $scope.savedLink = $scope.ngDialogData;
        $scope.success = (savedLink) => {
          this.savedLink = savedLink;
          ngDialog.close();
          return $state.go('userDash');
        };
      }]
    });
  };

  this.updateGithubProfile = () => {
    ngDialog.open({
      template: '<get-github success="success"></get-github>',
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
