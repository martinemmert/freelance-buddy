(function (angular) {
  "use strict";

  angular
    .module("app.customers")
    .config(['$modelProvider', function ($modelProvider) {
      $modelProvider.register('Customer', function () {
        return {
          url: 'customers',
          fields: ['name', 'abbreviation'],
          composed: {
            'labelText': {
              get: function () {
                return "[" + this.abbreviation + "] " + this.name;
              }
            }
          }
        }
      });
    }]);


})(angular);
