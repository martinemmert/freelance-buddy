(function (angular) {
  "use strict";

  angular
    .module("app.spendings")
    .config(['$modelProvider', function ($modelProvider) {
      $modelProvider.register('Spending', function () {
        return {
          url: 'spendings',
          fields: ['supplierId', 'comment', 'invoiceNumber', 'payedOn', 'netTotal', 'taxValue', 'taxFree'],
          belongsTo: [
            {
              relation: 'Supplier',
              relationField: 'supplierId',
              compositeField: 'supplier'
            }
          ],
          composed: {
            'isPayed': {
              get: function () {
                return this.payedOn && _.isDate(this.payedOn) ? this.payedOn.getTime() < Date.now() : false;
              }
            },
            'taxTotal': {
              get: function () {
                return this.netTotal * this.taxValue;
              }
            },
            'grossTotal': {
              get: function () {
                return this.taxTotal + this.netTotal;
              }
            }
          }
        }
      });
    }]);

})(angular);
