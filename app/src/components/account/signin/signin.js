import template from './signin.html';

export default {
  template,
  controller
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
    .then(res => {
      console.log(res);
      this.reset();
    })
    .catch(err => this.error = err.error);
  };
}
