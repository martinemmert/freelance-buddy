angular
  .module("app", ['meNgModels', 'ngRoute', 'ngMessages', 'app.customers', 'app.suppliers', 'app.projects', 'app.subprojects'])
  .constant('app.BASE_PATH', './assets/js/app/');
