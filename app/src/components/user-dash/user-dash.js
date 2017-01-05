import template from './user-dash.html';
import styles from './user-dash.scss';

export default {
  template,
  controller,
  bindings: {
    userData: '='   // putting a 2-way binding because I think we want to update this
  }
};

controller.$inject = ['ngDialog', '$state'];

function controller(ngDialog, $state) {
  this.styles = styles;
  // console.log(this.userData);
  // this.ghlink = !!(this.userData.ghUsername);
  // this.lilink = !!(this.userData.linkedIn);

  this.updateLinkProfile = () => {
    ngDialog.open({
      template: '<get-linkedin success="success"></get-linkedin>',
      plain: true, 
      width: '75%',
      controller: ['$scope', $scope => {
        $scope.success = () => {
          ngDialog.close();
          return $state.go('user-dash');
        };
      }]
    });
  };

}