(function (angular) {
  "use strict";

  angular
    .module("meNgModels")
    .factory("ModelRelationBuilder", ModelRelationBuilderFactory);

  ModelRelationBuilderFactory.$inject = ['$collection'];

  function ModelRelationBuilderFactory($collection) {

    return {
      createBelongsTo: createBelongsTo,
      createHasMany: createHasMany,
      createHasOne: createHasOne
    };

    function createRelationMap(target, type) {
      if (!target.hasOwnProperty('relationMap')) {
        Object.defineProperty(target, 'relationMap', {value: {}});
      }

      if (!target.relationMap.hasOwnProperty(type)) {
        Object.defineProperty(target.relationMap, type, {value: {}});
      }
    }

    function relationMappingExists(target, type, fieldName) {
      createRelationMap(target, type);
      return target.relationMap[type].hasOwnProperty(fieldName);
    }

    function getRelationMapping(target, type, fieldName) {
      return target.relationMap[type][fieldName];
    }

    function setupRelationMapping(target, type, fieldName, relation) {
      Object.defineProperty(target.relationMap[type], fieldName, {
        configurable: true,
        value: relation
      });
    }

    function deleteRelationMapping(target, type, fieldName) {
      delete target.relationMap[type][fieldName];
    }

    function createBelongsTo(prototype, fieldName, relation, relationField) {
      prototype["$" + fieldName] = {
        configurable: true, get: function () {
          var target = this, relatedCollection;
          if (!relationMappingExists(target, 'belongsTo', fieldName)) {
            relatedCollection = $collection(relation);
            setupRelationMapping(target, 'belongsTo', fieldName, relatedCollection);
          } else {
            relatedCollection = getRelationMapping(target, 'belongsTo', fieldName);
          }
          return relatedCollection.get(target[relationField]);
        }
      };
      prototype[fieldName] = {
        configurable: true, get: function () {
          var target = this;
          if (!relationMappingExists(target, 'belongsTo', fieldName)) {
            target["$" + fieldName].then(function (model) {
              target.$onSaved.addOnce(function () {
                deleteRelationMapping(target, 'belongsTo', fieldName);
                delete target[fieldName];
              }, target);
              Object.defineProperty(target, fieldName, {configurable: true, value: model});
              return model;
            });
          }
        }
      }
    }

    function createHasMany(prototype, fieldName, relation, relationField, relationKey) {
      prototype["$" + fieldName] = {
        configurable: true, get: function () {
          var target = this, relatedCollection;
          if (!relationMappingExists(target, 'hasMany', fieldName)) {
            relatedCollection = $collection(relation).createSubCollection(relationField, target[relationKey]);
            setupRelationMapping(target, 'hasMany', fieldName, relatedCollection);
          } else {
            relatedCollection = getRelationMapping(target, 'hasMany', fieldName);
          }
          return relatedCollection;
        }
      };
      prototype[fieldName] = {
        configurable: true, get: function () {
          var target = this;
          if (!relationMappingExists(target, 'hasMany', fieldName)) {
            target['$' + fieldName].$query().then(function (collection) {
              Object.defineProperty(target, fieldName, {configurable: true, value: collection});
              return collection;
            });
          }
        }
      }
    }

    function createHasOne(prototype, fieldName, relation, relationField) {
      prototype["$" + fieldName] = {
        configurable: true, get: function () {
          var target = this, relatedCollection;
          if (!relationMappingExists(target, 'hasOne', fieldName)) {
            relatedCollection = $collection(relation);
            setupRelationMapping(target, 'hasOne', fieldName, relatedCollection);
          } else {
            relatedCollection = getRelationMapping(target, 'hasOne', fieldName);
          }
          return relatedCollection.get(target[relationField]);
        }
      };
      prototype[fieldName] = {
        configurable: true, get: function () {
          var target = this;
          if (!relationMappingExists(target, 'hasOne', fieldName)) {
            target["$" + fieldName].then(function (model) {
              target.$onSaved.addOnce(function () {
                deleteRelationMapping(target, 'hasOne', fieldName);
                delete target[fieldName];
              }, target);
              Object.defineProperty(target, fieldName, {configurable: true, value: model});
              return model;
            });
          }
        }
      }
    }

  }

})(angular);
