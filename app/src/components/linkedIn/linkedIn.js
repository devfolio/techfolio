import template from './linkedIn.html';
import styles from './linkedIn.scss';

export default {
  template,
  controller,
  bindings: {
    userData: '<'
  }
};

function controller(userData) {
  this.styles = styles;

  this.firstName = userData.linkedIn.firstName;
  this.lastName = userData.linkedIn.lastName;
  this.headling = userData.linkedIn.headline;
  this.location = userData.linkedIn.location;
  this.publicProfileUrl = userData.linkedIn.publicProfileUrl;
  this.specialties = userData.linkedIn.specialties;
  this.positions = userData.linkedIn.positions;
  this.summary = userData.linkedIn.summary;
}
