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


function controller() {
  this.styles = styles;

  console.log('Profile: ', this.profile);

}
