(function (angular) {
  "use strict";

  angular
    .module("app.incomes")
    .controller('app.incomes.controller', IncomesController);

  IncomesController.$inject = ['$scope', 'IncomeCollection'];

  function IncomesController($scope, IncomeCollection) {

    var vm = this;
    vm.incomeCollection = IncomeCollection;
    vm.incomeCollectionLoaded = IncomeCollection.$isLoaded;

    vm.selectModel = function (model) {
      vm.selectedModel = model;
    };

    load();

    function load() {
      IncomeCollection.$query().then(function () {
        vm.incomeCollectionLoaded = IncomeCollection.$isLoaded;
      });
    }

  }

})(angular);
