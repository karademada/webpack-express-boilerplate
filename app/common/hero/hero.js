import angular from 'angular';
import uiRouter from 'angular-ui-router';
import heroComponent from './hero.component';
import './hero.scss';

let heroModule = angular.module('hero', [
  uiRouter
])

.component('hero', heroComponent);

export default heroModule;
