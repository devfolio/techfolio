import template from './blog.html';
import styles from './blog.scss';

export default {
  template,
  controller
};

function controller() { 
  this.styles = styles;
}
