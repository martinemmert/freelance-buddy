(function (angular) {
  "use strict";

  angular
    .module("app.subprojects")
    .config(['$collectionProvider', function ($collectionProvider) {
      $collectionProvider.register('Subproject', SubprojectCollectionProvider);
    }]);

  SubprojectCollectionProvider.$inject = ['SubprojectModel'];

  function SubprojectCollectionProvider(SubprojectModel) {
    return {
      model: SubprojectModel
    }
  }


})(angular);
