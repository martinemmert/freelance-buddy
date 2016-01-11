(function (angular) {
  "use strict";

  angular
    .module("app.incomes")
    .config(['$modelProvider', function ($modelProvider) {
      $modelProvider.register('Income', function () {
        return {
          url: 'incomes',
          fields: ['subprojectId', 'comment', 'invoiceNumber', 'payedOn', 'netTotal', 'taxValue', 'taxFree'],
          belongsTo: [
            {
              relation: 'Subproject',
              relationField: 'subprojectId',
              compositeField: 'subproject'
            }
          ],
          composed: {
            'isPayed': {
              get: function () {
                return this.payedOn && _.isDate(this.payedOn) ? this.payedOn.getTime() < Date.now() : false;
              }
            },
            'grossTotal': {
              get: function () {
                return this.netTotal * this.taxValue + this.netTotal;
              }
            }
          }
        }
      });
    }]);

})(angular);
