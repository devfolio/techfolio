import template from './get-github.html';
import styles from './get-github.scss';

export default {
  template,
  controller,
  bindings: {
    success: '<'
  }
};

controller.$inject = ['githubService'];

function controller (githubService) {
  this.styles = styles;
  this.savedRepos = [];
  this.loading = true;

  this.$onInit = () => {
    githubService.getRepos().then(repos => {
      this.repos = repos;
      this.loading = false;
    });

    githubService.getProfile()
      .then(profile => {
        this.profile = profile;
      });
  };

  this.saveGithub = info => {
    githubService.saveGithub(info)
      .then(() => {
        this.success();
      });
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
