(function (angular) {
  "use strict";

  angular
    .module("app.spendings")
    .config(['$collectionProvider', function ($collectionProvider) {
      $collectionProvider.register('Spending', SpendingCollectionProvider);
    }]);

  SpendingCollectionProvider.$inject = ['SpendingModel'];

  function SpendingCollectionProvider(SpendingModel) {
    return {
      model: SpendingModel,
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
