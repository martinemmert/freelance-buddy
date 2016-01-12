(function (angular) {
  "use strict";

  angular
    .module('app.projects', [])
    .constant("app.projects.MODULE_PATH", '/projects')
    .constant("app.projects.TEMPLATE_PATH", '/js/app/projects/templates/')
    .config(stateDefinitions);

  stateDefinitions.$inject = ['app.projects.TEMPLATE_PATH', '$stateProvider'];

  function stateDefinitions(TEMPLATE_PATH, $stateProvider) {

    $stateProvider
      .state('projects', {
        url: '/projects',
        templateUrl: TEMPLATE_PATH + "projects-main.tpl.html",
        controller: 'app.projects.controller as ctrl',
        resolve: {
          projectCollection: ['ProjectCollection', function (ProjectCollection) {
            return ProjectCollection.$query();
          }]
        }
      })
      .state("projects.create", {
        url: '/create',
        resolve: {
          customerCollection: ["CustomerCollection", function (CustomerCollection) {
            return CustomerCollection.$query();
          }],
          projectModel: ["projectCollection", function (projectCollection) {
            return projectCollection.$new();
          }]
        },
        templateUrl: TEMPLATE_PATH + "project-edit.tpl.html",
        controller: 'app.projects.projectEdit.controller as ctrl'
      })
      .state("projects.edit", {
        url: '/:projectId/edit',
        resolve: {
          customerCollection: ["CustomerCollection", function (CustomerCollection) {
            return CustomerCollection.$query();
          }],
          projectModel: ['$stateParams', 'projectCollection', function ($stateParams, projectCollection) {
            return projectCollection.get($stateParams.projectId);
          }]
        },
        templateUrl: TEMPLATE_PATH + "project-edit.tpl.html",
        controller: 'app.projects.projectEdit.controller as ctrl'
      })
      .state("projects.delete", {
        url: '/:projectId/delete',
        resolve: {
          projectModel: ['$stateParams', 'projectCollection', function ($stateParams, projectCollection) {
            return projectCollection.get($stateParams.projectId);
          }]
        },
        templateUrl: TEMPLATE_PATH + "project-delete.tpl.html",
        controller: 'app.projects.projectDelete.controller as ctrl'
      })
      .state("projects.details", {
        url: "/:projectId",
        resolve: {
          projectModel: ['$stateParams', 'projectCollection', function ($stateParams, projectCollection) {
            return projectCollection.get($stateParams.projectId);
          }],
          subprojectCollection: ['projectModel', function (projectModel) {
            return projectModel.$subprojects.$query();
          }]
        },
        views: {
          '': {
            templateUrl: TEMPLATE_PATH + "project-details.tpl.html",
            controller: 'app.projects.projectDetails.controller as ctrl'
          },
          'subprojects@projects.details': {
            templateUrl: TEMPLATE_PATH + "subprojects-main.tpl.html",
            controller: 'app.projects.subprojects.controller as ctrl'
          }
        }
      })
      .state("projects.details.subprojectsCreate", {
        url: "/subprojects/create",
        resolve: {
          subprojectModel: ['$stateParams', 'subprojectCollection', function ($stateParams, subprojectCollection) {
            return subprojectCollection.$new();
          }]
        },
        templateUrl: TEMPLATE_PATH + "subproject-edit.tpl.html",
        controller: 'app.projects.subprojectEdit.controller as ctrl'
      })
      .state("projects.details.subprojectDetails", {
        url: "/subprojects/:subprojectId",
        resolve: {
          subprojectModel: ['$stateParams', 'subprojectCollection', function ($stateParams, subprojectCollection) {
            return subprojectCollection.get($stateParams.subprojectId);
          }]
        },
        templateUrl: TEMPLATE_PATH + "subproject-details.tpl.html",
        controller: 'app.projects.subprojectDetails.controller as ctrl'
      })
      .state("projects.details.editSubproject", {
        url: "/subprojects/:subprojectId/edit",
        resolve: {
          subprojectModel: ['$stateParams', 'subprojectCollection', function ($stateParams, subprojectCollection) {
            return subprojectCollection.get($stateParams.subprojectId);
          }]
        },
        templateUrl: TEMPLATE_PATH + "subproject-edit.tpl.html",
        controller: 'app.projects.subprojectEdit.controller as ctrl'
      })
      .state("projects.details.deleteSubproject", {
        url: "/subprojects/:subprojectId/delete",
        resolve: {
          subprojectModel: ['$stateParams', 'subprojectCollection', function ($stateParams, subprojectCollection) {
            return subprojectCollection.get($stateParams.subprojectId);
          }]
        },
        templateUrl: TEMPLATE_PATH + "subproject-delete.tpl.html",
        controller: 'app.projects.subprojectDelete.controller as ctrl'
      })

  }

})(angular);
