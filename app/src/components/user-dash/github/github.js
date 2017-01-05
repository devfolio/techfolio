import template from './github.html';
import styles from './github.scss';

export default {
  template,
  controller,

};
controller.$inject = ['githubService'];

function controller (githubService) {
  this.styles = styles;

  this.$onInit = () => {
    githubService.getProfile()
      .then(profile => {
        this.profile = profile;
        console.log('in controller profile: ', this.profile);
        
      });
  };


  this.getRepos = () => {
    githubService.getRepos().then(repos => {
      this.repos = repos;
    });
  };


}