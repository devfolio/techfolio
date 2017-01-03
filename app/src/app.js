import angular from 'angular';
import components from './components';
import services from './services';

import uiRouter from 'angular-ui-router';
import dialog from 'ng-dialog';
import 'ng-dialog/css/ngDialog.css';
import 'ng-dialog/css/ngDialog-theme-default.css';

import routes from './routes';

const app = angular.module('TechFolio', [
  components,
  services,
  uiRouter,
  dialog
]);

app.value('apiUrl', 'http://localhost:3500');

app.config(routes);