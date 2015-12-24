(function (angular) {
  "use strict";

  angular
    .module("app.projects")
    .config(['$collectionProvider', function ($collectionProvider) {
      $collectionProvider.register('Project', ProjectCollectionProvider);
    }]);

  ProjectCollectionProvider.$inject = ['ProjectModel'];

  function ProjectCollectionProvider(ProjectModel) {
    return {
      model: ProjectModel
    }
  }


})(angular);
