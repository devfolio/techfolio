import template from './user-dash.html';
import styles from './user-dash.scss';

export default {
  template,
  controller,
  bindings: {
    userData: '='   // putting a 2-way binding because I think we want to update this
  }
};

controller.$inject= ['$auth', '$window', 'tokenService'];

function controller($auth, window, tokenService) {
  this.styles = styles;

  window.document.cookie = `token=${tokenService.get()}`;
  this.authenticate = provider => {
    $auth.authenticate(provider);
  };

  // this.ghlink = !!(this.userData.ghUsername);
  // this.lilink = !!(this.userData.linkedIn);


}