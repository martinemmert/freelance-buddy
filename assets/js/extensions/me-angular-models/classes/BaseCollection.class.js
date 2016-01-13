(function (angular) {
  "use strict";

  angular
    .module('meNgModels')
    .config(['$classProvider', function ($classProvider) {
      $classProvider.register('BaseCollection', BaseCollectionClassFactory);
    }]);

  BaseCollectionClassFactory.$inject = ['$q', '$class'];

  function BaseCollectionClassFactory($q, $class) {

    var BaseModelApi = $class('BaseModelApi');

    function BaseCollection(ModelClass) {

      var _self = this;

      if (ModelClass) {
        Object.defineProperty(_self, 'ModelClass', {value: ModelClass});
      }

      Object.defineProperty(_self, '$isLoaded', {
        writable: true,
        configurable: true,
        value: false
      });

      Object.defineProperty(_self, '$isLoading', {
        writable: true,
        configurable: true,
        value: false
      });

      Array.apply(this);

    }

    BaseCollection.prototype = Object.create(Array.prototype);
    BaseCollection.prototype.constructor = BaseCollection;

    Object.defineProperty(BaseCollection.prototype, 'url', {
      get: function () {
        return this.ModelClass.prototype.api.url
      }
    });

    Object.defineProperty(BaseCollection.prototype, '$new', {
      value: function (data) {
        var _self = this, model = new _self.ModelClass(data);
        model.$onSaved.addOnce(_saveListener, _self);
        model.$onDeleted.addOnce(_deleteListener, _self);
        return model;
      }
    });

    Object.defineProperty(BaseCollection.prototype, 'hasModel', {
      value: function (model) {
        var needle;
        if (_.isNumber(model)) {
          needle = _.find(this, {id: model});
        } else {
          needle = _.find(this, {id: model.id});
        }
        return needle != null;
      }
    });

    /**
     * get model by id
     * @param id
     * @returns {BaseModel|null}
     */
    Object.defineProperty(BaseCollection.prototype, 'getModel', {
      value: function (id) {
        if (this.hasModel(id)) {
          return _.find(this, {id: id});
        }
        return null;
      }
    });

    Object.defineProperty(BaseCollection.prototype, 'get', {
      value: function (id) {
        var _self = this, needle = _.find(_self, {id: parseInt(id)});
        if (!needle) {
          var model = new _self.ModelClass({id: id});
          model.promise = model.$load(id);
          model.promise.then(function (loadedModel) {
            delete model.promise;
            return loadedModel;
          });
          model.promise.finally(function () {
            if (!model.$isLoaded) {
              model.$onDeleted.dispatch(model);
            }
          });
          model.$onDeleted.addOnce(_deleteListener, _self);
          _self.push(model);
          return model.promise;
        } else if (!needle.$isLoaded) {
          return needle.promise;
        } else {
          return $q.when(needle);
        }
      }
    });

    Object.defineProperty(BaseCollection.prototype, 'add', {
      configurable: true,
      value: function (model) {
        if (!this.hasModel(model)) {
          this.push(model);
        }
      }
    });

    Object.defineProperty(BaseCollection.prototype, 'remove', {
      configurable: true,
      value: function (model) {
        if (this.hasModel(model)) {
          var index = this.indexOf(model);
          this.splice(index, 1);
        }
      }
    });

    Object.defineProperty(BaseCollection.prototype, '$query', {
      configurable: true,
      value: function () {
        var _self = this;
        if (!_self.$isLoaded && !_self.$isLoading) {
          console.log("i start loading");
          _self.$isLoading = true;
          _self._loadingPromise = BaseModelApi.$query(_self.url).then(function (data) {
            _self.$isLoading = false;
            _self.$isLoaded = true;
            _.forEach(data, function (rawModel) {
              var model = new _self.ModelClass(rawModel);
              model.$isLoaded = true;
              model.$isStored = true;
              model.$onDeleted.addOnce(_deleteListener, _self);
              delete _self._loadingPromise;
              _self.add(model);
            });
            return _self;
          });
          return _self._loadingPromise;
        } else if (!_self.$isLoaded && _self.$isLoading) {
          return _self._loadingPromise;
        } else {
          return $q.when(_self);
        }
      }
    });

    Object.defineProperty(BaseCollection.prototype, 'createSubCollection', {
      value: function (filterProp, filterValue) {

        var subCollection,
            parentCollection = this,
            parentConstructor = this.constructor,
            parentPrototype = this.constructor.prototype;

        // here starts the magic!!
        // we alter the prototype of the root collection to inform its children when
        // a model was added or removed
        if (!this.parent) {
          // extend the add method to add models to all subCollections
          Object.defineProperty(parentPrototype, 'add', {
            configurable: true,
            value: function (model) {
              BaseCollection.prototype.add.call(this, model);
              if (!model.$onSaved.has(_updateListener, this)) {
                model.$onSaved.addOnce(_updateListener, this);
              }
              // fixme: go through sub collection branches instead of iterating through all sub collections
              this.subCollections.forEach(function (subCollection) {
                // check if the parent sub collection has the model
                // if not we don't have to add it because it was filtered out previously
                if (subCollection.parent.hasModel(model)) {
                  if (subCollection.filterValue == model[subCollection.filterProp]) {
                    subCollection.push(model);
                  }
                }
              });
            }
          });

          // extend the remove method to remove models from all subCollections
          Object.defineProperty(parentPrototype, 'remove', {
            configurable: true,
            value: function (model) {
              BaseCollection.prototype.remove.call(this, model);
              model.$onSaved.remove(_updateListener, this);
              this.subCollections.forEach(function (subCollection) {
                var index = subCollection.indexOf(model);
                if (index != -1) {
                  subCollection.splice(index, 1);
                }
              });
            }
          });

          Object.defineProperty(parentPrototype, 'registerSubCollection', {
            configurable: true,
            value: function (subCollection) {
              if (!this.subCollections) {
                var _self = this;
                Object.defineProperty(_self, 'subCollections', {value: []});
                _self.forEach(function (model) {
                  model.$onSaved.addOnce(_updateListener, _self);
                });
              }
              this.subCollections.push(subCollection);
            }
          });
        }

        function SubCollectionClass() {
          parentConstructor.apply(this, arguments);

          Object.defineProperty(this, '$isLoaded', {
            configurable: true,
            get: function () {
              return this.root.$isLoaded;
            },
            set: function (value) {
              this.root.$isLoaded = value;
            }
          });

          Object.defineProperty(this, '$isLoading', {
            configurable: true,
            get: function () {
              return this.root.$isLoading;
            },
            set: function (value) {
              this.root.$isLoading = value;
            }
          });
        }

        SubCollectionClass.prototype = Object.create(parentPrototype);
        SubCollectionClass.prototype.constructor = SubCollectionClass;

        Object.defineProperty(SubCollectionClass.prototype, 'parent', {value: parentCollection});
        Object.defineProperty(SubCollectionClass.prototype, 'filterProp', {value: filterProp});
        Object.defineProperty(SubCollectionClass.prototype, 'filterValue', {value: filterValue});

        // allow access to the root collection
        // should not be used public, only internal
        if (!this.parent)Object.defineProperty(SubCollectionClass.prototype, 'root', {value: parentCollection});

        // override the add method to add models directly to the root collection
        // added models will cascade down and added to all subCollections
        Object.defineProperty(SubCollectionClass.prototype, 'add', {
          configurable: true,
          value: function (model) {
            this.root.add(model);
          }
        });

        // override the remove method to remove models directly from the root collection
        // removed models will cascade down and removed to all subCollections
        Object.defineProperty(SubCollectionClass.prototype, 'remove', {
          configurable: true,
          value: function (model) {
            this.root.remove(model);
          }
        });

        Object.defineProperty(SubCollectionClass.prototype, '$query', {
          configurable: true,
          value: function () {
            var _self = this;
            return this.root.$query().then(function (collection) {
              return _self;
            });
          }
        });

        subCollection = new SubCollectionClass();
        subCollection.root.registerSubCollection(subCollection);

        this.forEach(function (model) {
          if (model[filterProp] == filterValue) {
            if (!subCollection.hasModel(model)) {
              subCollection.push(model);
            }
          }
        });

        return subCollection;
      }
    });

    BaseCollection.extend = function (childPrototype) {
      return $class.extend(BaseCollection, null, childPrototype);
    };

    return BaseCollection;
  }

  function _saveListener(model) {
    this.add(model);
  }

  function _updateListener(model) {
    this.remove(model);
    this.add(model);
  }

  function _deleteListener(model) {
    this.remove(model);
    model.$onLoaded.removeAll();
    model.$onSaved.removeAll();
    model.$onDeleted.removeAll();
  }

})(angular);
