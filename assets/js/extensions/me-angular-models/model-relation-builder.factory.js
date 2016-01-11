(function (angular) {
  "use strict";

  angular
    .module("meNgModels")
    .factory("ModelRelationBuilder", ModelRelationBuilderFactory);

  ModelRelationBuilderFactory.$inject = ['$injector', '$class', '$model', '$collection'];

  function ModelRelationBuilderFactory($injector, $class, $model, $collection) {

    return {
      createHasMany: createHasMany,
      createHasOne: createHasOne,
      createBelongsTo: createHasOne // internally same as the hasOne relation
    };

    function createHasMany(fieldName, relation, relationField, relationKey) {
      var __loading = false;
      return function () {
        var _self             = this,
            relatedCollection = $collection(relation);

        if (!__loading) {
          __loading = true;
          relatedCollection.$query().then(function () {
            Object.defineProperty(_self, fieldName, {value: relatedCollection.createSubCollection(relationField, _self[relationKey])});
            __loading = false;
          });
        }
      }
    }

    function createHasOne(fieldName, relation, relationField) {
      var __loading = false;
      return function () {
        var _self             = this,
            relatedCollection = $collection(relation);

        if (!__loading) {
          __loading = true;
          relatedCollection.get(_self[relationField]).then(function (model) {
            Object.defineProperty(_self, fieldName, {configurable: true, value: model});
            // by deleting the instance property we are returning to the getter of the prototype
            _self.$onSaved.addOnce(function () {
              delete this[fieldName];
            }, _self);
            __loading = false;
            return model;
          });
        }
      }
    }

  }

})(angular);
