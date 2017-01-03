import angular from 'angular';
import components from './components';

import satellizer from 'satellizer';
import oauth from './auth/oauth';

import uiRouter from 'angular-ui-router';
import routes from './routes';

const app = angular.module('TechFolio', [
  components,
  uiRouter,
  satellizer
]);

app.config(routes);
app.value('apiUrl', 'http://localhost:3000/api');
