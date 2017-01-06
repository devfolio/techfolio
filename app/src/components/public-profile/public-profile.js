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

controller.inject = [];

function controller() {
  this.styles = styles;


}
