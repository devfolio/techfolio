import template from './github.html';
import styles from './github.scss';

export default {
  template,
  controller,
  bindings: {

  }
};
controller.$inject = ['githubService'];

function controller (githubService) {
  this.styles = styles;
  this.getProfile = () => {
    githubService.getProfile().then(profile => {
      this.profile = profile;
    });
  };

  this.getRepos = () => {
    githubService.getRepos().then(repos => {
      this.repos = repos;
    });
  };


}