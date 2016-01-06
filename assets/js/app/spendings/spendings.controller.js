(function (angular) {
  "use strict";

  angular
    .module("app.spendings")
    .controller('app.spendings.controller', SpendingsController);

  SpendingsController.$inject = ['$scope', 'SpendingCollection'];

  function SpendingsController($scope, SpendingCollection) {

    var vm = this;
    vm.spendingCollection = SpendingCollection;
    vm.spendingCollectionLoaded = SpendingCollection.$isLoaded;

    vm.selectModel = function (model) {
      vm.selectedModel = model;
    };

    load();

    function load() {
      SpendingCollection.$query().then(function () {
        vm.spendingCollectionLoaded = SpendingCollection.$isLoaded;
      });
    }

  }

})(angular);
