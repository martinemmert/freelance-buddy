(function (angular) {
  "use strict";

  angular
    .module('app.spendings', [])
    .constant("app.spendings.MODULE_PATH", '/spendings')
    .constant("app.spendings.TEMPLATE_PATH", '/js/app/spendings/templates/')
    .config(stateDefinitions);

  stateDefinitions.$inject = ['app.spendings.TEMPLATE_PATH', '$stateProvider'];

  function stateDefinitions(TEMPLATE_PATH, $stateProvider) {
    $stateProvider
      .state('spendings', {
        url: '/spendings',
        templateUrl: TEMPLATE_PATH + 'spendings-main.tpl.html',
        controller: 'app.spendings.controller as ctrl',
        resolve: {
          supplierCollection: ['SupplierCollection', function (SupplierCollection) {
            return SupplierCollection.$query();
          }],
          spendingCollection: ['SpendingCollection', function (SpendingCollection) {
            return SpendingCollection.$query();
          }]
        }
      })
      .state('spendings.create', {
        url: '/create',
        data: {
          title: 'Add new Spending'
        },
        resolve: {
          spendingModel: ["spendingCollection", function (spendingCollection) {
            return spendingCollection.$new();
          }]
        },
        views: {
          '@spendings': {
            templateUrl: TEMPLATE_PATH + "spending-edit.tpl.html",
            controller: 'app.spendings.spendingEdit.controller as ctrl'
          }
        }
      })
      .state('spendings.spending', {
        abstract: true,
        url: '/:spendingId',
        resolve: {
          spendingModel: ['$stateParams', 'spendingCollection', function ($stateParams, spendingCollection) {
            return spendingCollection.get($stateParams.spendingId);
          }]
        }
      })
      .state("spendings.spending.edit", {
        url: '/edit',
        data: {
          title: 'Edit Spending'
        },
        views: {
          '@spendings': {
            templateUrl: TEMPLATE_PATH + "spending-edit.tpl.html",
            controller: 'app.spendings.spendingEdit.controller as ctrl'
          },
          'delete@spendings.spending.edit': {
            templateUrl: TEMPLATE_PATH + "spending-delete.tpl.html",
            controller: 'app.spendings.spendingDelete.controller as ctrl'
          }
        }
      })

  }

})(angular);
