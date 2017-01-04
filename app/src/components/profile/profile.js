import template from './profile.html';
import styles from './profile.scss';

export default {
  template,
  controller,
  bindings: {
    linkedIn: '<'
  }
};

function controller() { // eslint-disable-line
  this.styles = styles;
  this.firstName = linkedIn.first-name;
  this.lastName = linkedIn.last-name;
  this.headling = linkedIn.headline;
  this.location = linkedIn.location;
  this.publicProfileUrl = linkedIn.public-profile-url;
  this.specialties = linkedIn.specialties;
  this.positions = linkedIn.positions;
  this.summary = linkedIn.summary;
}
