(function (angular) {
  "use strict";

  angular
    .module("app.incomes")
    .config(['$collectionProvider', function ($collectionProvider) {
      $collectionProvider.register('Income', IncomeCollectionProvider);
    }]);

  IncomeCollectionProvider.$inject = ['IncomeModel'];

  function IncomeCollectionProvider(IncomeModel) {
    return {
      model: IncomeModel,
      properties: {
        grandNetTotal: {
          get: function () {
            var _grandTotal = 0;
            this.forEach(function (model, index) {
              _grandTotal += model.netTotal;
            });

            return _grandTotal;
          }
        },
        grandGrossTotal: {
          get: function () {
            var _grandTotal = 0;
            this.forEach(function (model, index) {
              _grandTotal += model.grossTotal;
            });

            return _grandTotal;
          }
        }
      }
    }
  }


})(angular);
