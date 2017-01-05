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
  this.styles = styles;  
  this.linkProfile = {};
  this.updateProfile = {
    headline: this.headline,
    position: {
      title: this.positionTitle,
    },
    connections: this.connections,
    pictureUrl: this.pictureUrl,
    profileUrl: this.profileUrl
  };

  console.log

  linkedinService.get()
    .then(profile => {
      this.linkProfile = profile;
    });

  this.submit = () => {
    linkedinService.post(this.updateProfile)
      .then(() => {
        this.success();
      });
  };

  
}