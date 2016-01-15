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
          customerCollection: ['CustomerCollection', function (CustomerCollection) {
            return CustomerCollection.$query();
          }],
          projectCollection: ['ProjectCollection', function (ProjectCollection) {
            return ProjectCollection.$query();
          }],
          subprojectCollection: ['SubprojectCollection', function (SubprojectCollection) {
            return SubprojectCollection.$query();
          }],
          incomeCollection: ['IncomeCollection', function (IncomeCollection) {
            return IncomeCollection.$query();
          }]
        }
      })
      .state('incomes.create', {
        url: '/create',
        resolve: {
          incomeModel: ["incomeCollection", function (incomeCollection) {
            return incomeCollection.$new();
          }]
        },
        data: {
          title: 'Add new Income'
        },
        views: {
          '@incomes': {
            templateUrl: TEMPLATE_PATH + "income-edit.tpl.html",
            controller: 'app.incomes.incomeEdit.controller as ctrl'
          }
        }
      })
      .state('incomes.income', {
        abstract: true,
        url: '/:incomeId',
        resolve: {
          incomeModel: ['$stateParams', 'incomeCollection', function ($stateParams, incomeCollection) {
            return incomeCollection.get($stateParams.incomeId);
          }]
        }
      })
      .state("incomes.income.edit", {
        url: '/edit',
        data: {
          title: 'Edit Income'
        },
        views: {
          '@incomes': {
            templateUrl: TEMPLATE_PATH + "income-edit.tpl.html",
            controller: 'app.incomes.incomeEdit.controller as ctrl'
          },
          'delete@incomes.income.edit': {
            templateUrl: TEMPLATE_PATH + "income-delete.tpl.html",
            controller: 'app.incomes.incomeDelete.controller as ctrl'
          }
        }
      })
  }
})(angular);
