import template from './home.html';
import styles from './home.scss';

export default {
  template,
  controller
};

controller.$inject = ['$state'];

function controller($state) { // eslint-disable-line
  this.styles = styles;
}
