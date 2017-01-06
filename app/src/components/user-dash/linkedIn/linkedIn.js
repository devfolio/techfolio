import template from './linkedIn.html';
import styles from './linkedIn.scss';

export default {
  template,
  controller,
  bindings: {
    savedLink: '='
  }
};

controller.$inject = ['linkedinService'];

function controller(linkedinService) {
  this.styles = styles;
  this.loading = true;

  this.savedLink = {};

  this.$onInit = () => {
    linkedinService.getSaved()
      .then(saved => {
        this.savedLink = saved;
        this.loading = false;
      });
  };
}
