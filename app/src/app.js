import angular from 'angular';
import components from './components';
import services from './services';

import satellizer from 'satellizer';
import oauth from './auth/oauth';

import uiRouter from 'angular-ui-router';

import routes from './routes';

const app = angular.module('TechFolio', [
  components,
  uiRouter,
  services,
  satellizer
]);

app.value('apiUrl', 'http://localhost:3500');

app.config(routes);