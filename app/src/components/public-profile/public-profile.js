import template from './public-profile.html';
import styles from './public-profile.scss';

export default {
  template,
  controller,
  bindings: {
    userUrl: '<',
    profile: '<'
  }
};

controller.inject = ['userService'];

function controller(userService) {
  this.styles = styles;

  this.profile = {};

  this.$onInit = () => {
    userService.getPublicProfile(this.userUrl)
      .then(profile => {
        this.profile = profile;
      });
  };

}
