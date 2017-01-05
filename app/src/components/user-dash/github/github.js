import template from './github.html';
import styles from './github.scss';

export default {
  template,
  controller,
  bindings: {
    ghProfile: '<'
  }
};
controller.$inject = ['githubService'];

function controller (githubService) {
  this.styles = styles;

  // this.getProfile = () => {
  //   githubService.getProfile().then(profile => {
  //   this.ghProfile = profile;
  //   });
  // };

  this.$onInit = () => {
    githubService.getProfile()
      .then(profile => {
        this.ghProfile = profile;
        console.log('in controller profile: ', this.ghProfile);
      });
  };


  this.getRepos = () => {
    githubService.getRepos().then(repos => {
      this.repos = repos;
    });
  };


}