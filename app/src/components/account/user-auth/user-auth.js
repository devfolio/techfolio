import template from './user-auth.html';

export default {
  template,
  bindings: {
    success: '<'    // pull in the success function from ng-dialog
  },
  controller
};

function controller() {
  // set the default view of dialog to sign in
  this.action = 'signin';
}