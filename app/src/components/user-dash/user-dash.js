import template from './user-dash.html';
import styles from './user-dash.scss';

export default {
  template,
  controller,
  bindings: {
    userData: '='   // putting a 2-way binding because I think we want to update this
  }
};

function controller() {
  this.styles = styles;

  this.ghlink = !!(this.userData.ghUsername);
  this.lilink = !!(this.userData.linkedIn);


}