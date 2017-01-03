import template from './signup.html';

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
    this.firstname = '';
    this.lastname = '';
    this.password = '';
  };

  this.signup = () => {
    return userService.signup({
      email: this.email,
      firstName: this.firstname,
      lastName: this.lastname,
      password: this.password
    })
    .then(res => {
      console.log(res);
      this.success();
      this.reset();
    })
    .catch(err => this.error = err.error);
  };
}
