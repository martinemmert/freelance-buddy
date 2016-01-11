angular
  .module("app", ['meNgModels', 'ui.router', 'ngMessages', 'app.customers', 'app.suppliers', 'app.projects', 'app.subprojects', 'app.incomes', 'app.spendings'])
  .constant('app.BASE_PATH', './assets/js/app/');
