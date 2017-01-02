import angular from 'angular';
import components from './components';

import uiRouter from 'angular-ui-router';
import routes from './routes';

const app = angular.module('TechFolio', [
  components,
  uiRouter
]);

app.config(routes);
app.value('apiUrl', 'http://localhost:3000/api');
