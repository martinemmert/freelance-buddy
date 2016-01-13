(function (angular) {
  "use strict";

  angular
    .module('app.incomes', [])
    .constant("app.incomes.MODULE_PATH", '/incomes')
    .constant("app.incomes.TEMPLATE_PATH", '/js/app/incomes/templates/')
    .config(stateDefinitions);

  stateDefinitions.$inject = ['app.incomes.TEMPLATE_PATH', '$stateProvider'];

  function stateDefinitions(TEMPLATE_PATH, $stateProvider) {
    $stateProvider
      .state('incomes', {
        url: '/incomes',
        templateUrl: TEMPLATE_PATH + 'incomes-main.tpl.html',
        controller: 'app.incomes.controller as ctrl',
        resolve: {
          incomeCollection: ['IncomeCollection', function (IncomeCollection) {
            return IncomeCollection.$query();
          }],
          subprojectCollection: ['SubprojectCollection', function (SubprojectCollection) {
            return SubprojectCollection.$query();
          }]
        }
      })
      .state("incomes.create", {
        url: '/create',
        resolve: {
          incomeModel: ["incomeCollection", function (incomeCollection) {
            return incomeCollection.$new();
          }]
        },
        templateUrl: TEMPLATE_PATH + "income-edit.tpl.html",
        controller: 'app.incomes.incomeEdit.controller as ctrl'
      })
      .state("incomes.edit", {
        url: '/edit/:incomeId',
        resolve: {
          incomeModel: ['$stateParams', 'incomeCollection', function ($stateParams, incomeCollection) {
            return incomeCollection.get($stateParams.incomeId);
          }]
        },
        templateUrl: TEMPLATE_PATH + "income-edit.tpl.html",
        controller: 'app.incomes.incomeEdit.controller as ctrl'
      })
      .state("incomes.details", {
        url: "/details/:incomeId",
        resolve: {
          incomeModel: ['$stateParams', 'incomeCollection', function ($stateParams, incomeCollection) {
            return incomeCollection.get($stateParams.incomeId);
          }]
        },
        templateUrl: TEMPLATE_PATH + "income-details.tpl.html",
        controller: 'app.incomes.incomeDetails.controller as ctrl'
      })
      .state("incomes.delete", {
        url: '/delete/:incomeId',
        resolve: {
          incomeModel: ['$stateParams', 'incomeCollection', function ($stateParams, incomeCollection) {
            return incomeCollection.get($stateParams.incomeId);
          }]
        },
        templateUrl: TEMPLATE_PATH + "income-delete.tpl.html",
        controller: 'app.incomes.incomeDelete.controller as ctrl'
      })
  }
})(angular);
