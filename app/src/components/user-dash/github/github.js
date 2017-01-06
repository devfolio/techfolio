import template from './github.html';
import styles from './github.scss';

export default {
  template,
  controller,

};
controller.$inject = ['githubService'];

function controller (githubService) {
  this.savedRepos = [];

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

  this.saveGithub = info => {
    githubService.saveGithub(info);
  };

  this.addGithub = () => {
    this.saveGithub({
      userId: this.profile.id,
      userName: this.profile.login,
      url: this.profile.html_url,
      numRepos: this.profile.public_repos,
      bio: this.profile.bio,
      website: this.profile.blog,
      memberSince: this.profile.created_at,
      savedRepos: this.savedRepos


    });
  };

  this.saveRepos = repo => {
    const index = this.savedRepos.findIndex(element => {
      return element.id == repo.id;
    });
    if(index > -1) {
      this.savedRepos.splice(index, 1);
    } else {
      this.savedRepos.push({id: repo.id, name: repo.name, stars: repo.stargazers_count, lastUpdate: repo.updated_at});
    }
  };


}