import template from './profile.html';
import styles from './profile.scss';

export default {
  template,
  controller,
  bindings: {
    linkedIn: '<'
  }
};

function controller(linkedIn) {
  this.styles = styles;
  this.firstName = linkedIn.firstName;
  this.lastName = linkedIn.lastName;
  this.headling = linkedIn.headline;
  this.location = linkedIn.location;
  this.publicProfileUrl = linkedIn.publicProfileUrl;
  this.specialties = linkedIn.specialties;
  this.positions = linkedIn.positions;
  this.summary = linkedIn.summary;
}
