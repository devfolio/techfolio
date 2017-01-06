import template from './signin.html';

export default {
  template,
  controller,
  bindings: {
    success: '<'
  }
};

controller.$inject = ['userService'];

function controller(userService) {

  this.reset = () => {
    this.email = '';
    this.password = '';
  };

  this.signin = () => {
    return userService.signin({
      email: this.email,
      password: this.password
    })
    .then(() => {
      this.success();
      this.reset();
    })
    .catch(err => this.error = err.error);
  };
}
