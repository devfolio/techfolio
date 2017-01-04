import template from './welcome.html';

export default {
  template,
  controller
};

controller.$inject= ['$auth', '$window', 'tokenService'];

function controller($auth, window, tokenService){
  
  window.document.cookie = `token=${tokenService.get()}`;
  this.authenticate = provider => {
    $auth.authenticate(provider);
  };
}