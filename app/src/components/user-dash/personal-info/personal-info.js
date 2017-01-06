import template from './personal-info.html';

export default {
  template,
  controller
};

controller.$inject = ['userService'];

function controller(userService) {
  this.savesForm = () => {
    userService.saveForm({
      location: this.location,
      college: this.college,
      degree: this.degree,
      graduation: this.gradyear,
      college2: this.college2,
      degree2: this.degree2,
      graduation2: this.gradyear2,
      vocschool: this.vocschool,
      certification: this.certification,
      skills: this.skills,
      twitter: this.twitter,
      facebook: this.facebook
    });
    this.reset();
  };

  this.reset = () => {
    this.location = '';
    this.college = '';
    this.degree = '';
    this.gradyear = '';
    this.college2 = '';
    this.degree2 = '';
    this.gradyear2 = '';
    this.vocschool = '';
    this.certification = '';
    this.skills = '';
    this.twitter = '';
    this.facebook = '';
  };
}
