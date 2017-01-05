import template from './github.html';
import styles from './github.scss';

export default {
  template,
  controller,

};
controller.$inject = ['githubService'];

function controller (githubService) {
  this.styles = styles;

  this.loading = true;

  this.$onInit = () => {
    githubService.getProfile()
      .then(profile => {
        this.loading = false;        
        this.profile = profile;
      });
  };


  this.getRepos = () => {
    githubService.getRepos().then(repos => {
      this.repos = repos;
    });
  };


}