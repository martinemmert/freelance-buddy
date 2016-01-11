(function (angular) {
  "use strict";

  angular
    .module('app.suppliers', [])
    .constant("app.suppliers.MODULE_PATH", '/suppliers')
    .constant("app.suppliers.TEMPLATE_PATH", '/js/app/suppliers/templates/')
    .config(StatesConfig);

  StatesConfig.$inject = ['app.suppliers.TEMPLATE_PATH', '$stateProvider'];

  function StatesConfig(TEMPLATE_PATH, $stateProvider) {

    $stateProvider
      .state('suppliers', {
        url: '/suppliers',
        templateUrl: TEMPLATE_PATH + 'suppliers-main.tpl.html',
        controller: 'app.suppliers.controller as ctrl',
        resolve: {
          supplierCollection: ['SupplierCollection', function (SupplierCollection) {
            return SupplierCollection.$query();
          }]
        }
      })
      .state("suppliers.create", {
        url: '/create',
        resolve: {
          supplierModel: ["supplierCollection", function (supplierCollection) {
            return supplierCollection.$new();
          }]
        },
        views: {
          'suppliers.content': {
            templateUrl: TEMPLATE_PATH + "supplier-edit.tpl.html",
            controller: 'app.suppliers.supplierEdit.controller as ctrl'
          }
        }
      })
      .state("suppliers.edit", {
        url: '/edit/:supplierId',
        resolve: {
          supplierModel: ['$stateParams', 'supplierCollection', function ($stateParams, supplierCollection) {
            return supplierCollection.get($stateParams.supplierId);
          }]
        },
        views: {
          'suppliers.content': {
            templateUrl: TEMPLATE_PATH + "supplier-edit.tpl.html",
            controller: 'app.suppliers.supplierEdit.controller as ctrl'
          }
        }
      })
      .state("suppliers.details", {
        url: "/details/:supplierId",
        resolve: {
          supplierModel: ['$stateParams', 'supplierCollection', function ($stateParams, supplierCollection) {
            return supplierCollection.get($stateParams.supplierId);
          }]
        },
        views: {
          'suppliers.content': {
            templateUrl: TEMPLATE_PATH + "supplier-details.tpl.html",
            controller: 'app.suppliers.supplierDetails.controller as ctrl'
          }
        }
      })
      .state("suppliers.delete", {
        url: '/delete/:supplierId',
        resolve: {
          supplierModel: ['$stateParams', 'supplierCollection', function ($stateParams, supplierCollection) {
            return supplierCollection.get($stateParams.supplierId);
          }]
        },
        views: {
          'suppliers.content': {
            templateUrl: TEMPLATE_PATH + "supplier-delete.tpl.html",
            controller: 'app.suppliers.supplierDelete.controller as ctrl'
          }
        }
      })

  }

})(angular);
