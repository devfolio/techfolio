import template from './github.html';
import styles from './github.scss';

export default {
  template,
  controller,
};

controller.$inject = ['userService'];

function controller (userService) {
  this.styles = styles;
  this.loading = true;

  this.$onInit = () => {
    userService.getProfile()
      .then(profile => {
        this.loading = false;        
        this.profile = profile;
      });
  };
}
