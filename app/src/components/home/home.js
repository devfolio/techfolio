import template from './home.html';
import styles from './home.scss';

export default {
  template,
  controller
};

controller.$inject = ['userService', 'tokenService', '$state'];

function controller(userService, tokenService, $state) {
  this.styles = styles;

  this.$onInit = () => {
    if (tokenService.get()) {
      this.hastoken = true;
    }
  };

  this.signin = () => {
    $state.go('userDash');
  };

  this.signout = () => {
    userService.signout();
    this.hastoken = false;
    $state.go('home');
  };
}
