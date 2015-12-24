(function (angular) {
  "use strict";

  angular
    .module('app.customers', [])
    .constant("app.customers.MODULE_PATH", '/customers')
    .constant("app.customers.TEMPLATE_PATH", '/js/app/customers/templates/');

})(angular);
