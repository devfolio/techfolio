import template from './blog.html';
import styles from './blog.scss';

export default {
  template,
  controller
};

controller.$inject = ['$state'];

function controller($state) { // eslint-disable-line
  this.styles = styles;
}
