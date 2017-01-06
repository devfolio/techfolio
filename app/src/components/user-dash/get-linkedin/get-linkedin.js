import template from './get-linkedin.html';
import styles from './get-linkedin.scss';

export default {
  template,
  bindings: {
    success: '<',
    savedLink: '='
  },
  controller
};

controller.$inject = ['linkedinService'];

function controller(linkedinService){
  this.styles = styles;  
  this.loading = true;

  this.selected ={
    headline: true,
    positionTitle: false,
    positionCompany: false,
    positionLocation: false,
    positionSummary: false,
    connections: false,
    pictureUrl: false,
    profileUrl: true,
    summary: true
  };

  this.savedLink = {};

  this.$onInit = () => {
    linkedinService.get()
      .then(profile => {
        this.savedLink = profile;
        this.loading = false;
      });
  };

  this.submit = () => {
    Object.keys(this.savedLink).forEach(key => {
      if(!this.selected[key]) this.savedLink[key] = '';
    });
    linkedinService.post(this.savedLink)
      .then(() => {
        this.success(this.savedLink);
      });
  };

  
}