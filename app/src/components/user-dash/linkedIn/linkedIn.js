import template from './linkedIn.html';
import styles from './linkedIn.scss';

export default {
  template,
  controller,
};

controller.$inject = ['linkedinService'];

function controller(linkedinService) {
  this.styles = styles;

  this.savedLink = {};

  this.$onInit = () => {
    linkedinService.getSaved()
      .then(saved => this.savedLink = saved);
  };
}
