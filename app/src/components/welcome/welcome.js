import template from './welcome.html';

export default {
  template,
  controller
};

controller.$inject= ['$auth', 'linkedinService'];

function controller($auth, linkedinService){

  this.authenticate = provider => {
    $auth.authenticate(provider);
  };

  this.getLinkedIn = () => {
    // but nothing hapens here...
    linkedinService.get();
  };
}