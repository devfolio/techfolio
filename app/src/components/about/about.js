import template from './about.html';
import styles from './about.scss';

export default {
  template,
  controller
};

controller.$inject = ['$state'];

function controller($state) { // eslint-disable-line
  this.styles = styles;
}
