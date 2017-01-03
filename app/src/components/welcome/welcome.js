import template from './welcome.html';

export default {
  template,
  controller
};

controller.$inject= ['$auth'];

function controller($auth){
  this.authenticate = provider => {
    $auth.authenticate(provider);
  };
}