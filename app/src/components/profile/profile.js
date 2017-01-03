import template from './profile.html';
import styles from './profile.scss';

export default {
  template,
  controller
};

controller.$inject = ['$state'];

function controller($state) { // eslint-disable-line
  this.styles = styles;
}
