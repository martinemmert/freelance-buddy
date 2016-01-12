(function (angular) {
  "use strict";

  angular
    .module("app.projects")
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
