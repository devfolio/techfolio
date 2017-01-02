import angular from 'angular';
import components from './components';

import uiRouter from 'angular-ui-router';

const app = angular.module('myApp', [
  components,
  uiRouter
]);

app.value('apiUrl', 'http://localhost:3000/api');
