angular
  .module("app", ['meNgModels', 'ui.router', 'ngMessages', 'app.shared', 'app.navigations', 'app.customers', 'app.suppliers', 'app.projects', 'app.incomes', 'app.spendings'])
  .constant('app.BASE_PATH', './assets/js/app/');
