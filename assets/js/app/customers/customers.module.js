(function (angular) {
  "use strict";

  angular
    .module('app.customers', [])
    .constant("app.customers.MODULE_PATH", '/customers')
    .constant("app.customers.TEMPLATE_PATH", '/js/app/customers/templates/')
    .config(stateDefinitions);

  stateDefinitions.$inject = ['app.customers.TEMPLATE_PATH', '$stateProvider'];

  function stateDefinitions(TEMPLATE_PATH, $stateProvider) {
    $stateProvider
      .state("customers", {
        url: '/customers',
        templateUrl: TEMPLATE_PATH + "customers-main.tpl.html",
        controller: 'app.customers.controller as ctrl',
        resolve: {
          customerCollection: ["CustomerCollection", function (CustomerCollection) {
            console.log("load customer collection");
            return CustomerCollection.$query();
          }]
        }
      })
      .state("customers.create", {
        url: '/create',
        resolve: {
          customerModel: ["customerCollection", function (customerCollection) {
            return customerCollection.$new();
          }]
        },
        views: {
          'customers.content': {
            templateUrl: TEMPLATE_PATH + "customer-edit.tpl.html",
            controller: 'app.customers.customerEdit.controller as ctrl'
          }
        }
      })
      .state("customers.edit", {
        url: '/edit/:customerId',
        resolve: {
          customerModel: ['$stateParams', 'customerCollection', function ($stateParams, customerCollection) {
            return customerCollection.get($stateParams.customerId);
          }]
        },
        views: {
          'customers.content': {
            templateUrl: TEMPLATE_PATH + "customer-edit.tpl.html",
            controller: 'app.customers.customerEdit.controller as ctrl'
          }
        }
      })
      .state("customers.details", {
        url: "/details/:customerId",
        resolve: {
          customerModel: ['$stateParams', 'customerCollection', function ($stateParams, customerCollection) {
            return customerCollection.get($stateParams.customerId);
          }]
        },
        views: {
          'customers.content': {
            templateUrl: TEMPLATE_PATH + "customer-details.tpl.html",
            controller: 'app.customers.customerDetails.controller as ctrl'
          }
        }
      })
      .state("customers.delete", {
        url: '/delete/:customerId',
        resolve: {
          customerModel: ['$stateParams', 'customerCollection', function ($stateParams, customerCollection) {
            return customerCollection.get($stateParams.customerId);
          }]
        },
        views: {
          'customers.content': {
            templateUrl: TEMPLATE_PATH + "customer-delete.tpl.html",
            controller: 'app.customers.customerDelete.controller as ctrl'
          }
        }
      })
  }

})(angular);
