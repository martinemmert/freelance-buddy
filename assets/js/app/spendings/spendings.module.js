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
          spendingCollection: ['SpendingCollection', function (SpendingCollection) {
            return SpendingCollection.$query();
          }],
          supplierCollection: ['SupplierCollection', function (SupplierCollection) {
            return SupplierCollection.$query();
          }]
        }
      })
      .state("spendings.create", {
        url: '/create',
        resolve: {
          spendingModel: ["spendingCollection", function (spendingCollection) {
            return spendingCollection.$new();
          }]
        },
        templateUrl: TEMPLATE_PATH + "spending-edit.tpl.html",
        controller: 'app.spendings.spendingEdit.controller as ctrl'
      })
      .state("spendings.edit", {
        url: '/edit/:spendingId',
        resolve: {
          spendingModel: ['$stateParams', 'spendingCollection', function ($stateParams, spendingCollection) {
            return spendingCollection.get($stateParams.spendingId);
          }]
        },
        templateUrl: TEMPLATE_PATH + "spending-edit.tpl.html",
        controller: 'app.spendings.spendingEdit.controller as ctrl'
      })
      .state("spendings.details", {
        url: "/details/:spendingId",
        resolve: {
          spendingModel: ['$stateParams', 'spendingCollection', function ($stateParams, spendingCollection) {
            return spendingCollection.get($stateParams.spendingId);
          }]
        },
        templateUrl: TEMPLATE_PATH + "spending-details.tpl.html",
        controller: 'app.spendings.spendingDetails.controller as ctrl'
      })
      .state("spendings.delete", {
        url: '/delete/:spendingId',
        resolve: {
          spendingModel: ['$stateParams', 'spendingCollection', function ($stateParams, spendingCollection) {
            return spendingCollection.get($stateParams.spendingId);
          }]
        },
        templateUrl: TEMPLATE_PATH + "spending-delete.tpl.html",
        controller: 'app.spendings.spendingDelete.controller as ctrl'
      })
  }

})(angular);
