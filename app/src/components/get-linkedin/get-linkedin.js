import template from './get-linkedin.html';
import styles from './get-linkedin.scss';

export default {
  template,
  bindings: {
    success: '<'
  },
  controller
};

controller.$inject = ['linkedinService'];

function controller(linkedinService){

  this.selected ={
    headline: true,
    positionTitle: false,
    positionCompany: false,
    positionLocation: false,
    positionSummary: false,
    connections: false,
    pictureUrl: false,
    profileUrl: true,
    profileSummary: true
  };
  this.styles = styles;  
  this.linkProfile = {};

  linkedinService.get()
    .then(profile => {
      this.linkProfile = profile;
    });

  this.submit = () => {
    Object.keys(this.linkProfile).forEach(key => {
      if(!this.selected[key]) this.linkProfile[key] = false;
    });
    linkedinService.post(this.linkProfile)
      .then(() => {
        this.success();
      });
  };

  
}