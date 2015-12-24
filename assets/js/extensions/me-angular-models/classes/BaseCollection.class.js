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

    var BaseCollection = $class.extend(Array, function BaseCollection(ModelClass) {

      var _self = this;

      if (ModelClass) {
        Object.defineProperty(_self, 'ModelClass', {value: ModelClass});
      }

      Object.defineProperty(_self, 'url', {
        get: function () {
          return _self.ModelClass.prototype.api.url
        }
      });

      Object.defineProperty(_self, '$isLoaded', {
        writable: true,
        value: false
      });

      Object.defineProperty(_self, '$isLoading', {
        writable: true,
        value: false
      });

      Array.apply(_self);
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

    Object.defineProperty(BaseCollection.prototype, 'get', {
      value: function (id) {
        var _self = this, needle = _.find(_self, {id: id});
        if (!needle) {
          console.log("not loaded");
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
          _self.push(model);
          return model.promise;
        } else if (!needle.$isLoaded) {
          console.log("currently loading");
          return needle.promise;
        } else {
          console.log("already loaded");
          return $q.when(needle);
        }
      }
    });

    Object.defineProperty(BaseCollection.prototype, 'add', {
      value: function (model) {
        if (!this.hasModel(model)) {
          this.push(model);
        }
      }
    });

    Object.defineProperty(BaseCollection.prototype, '$query', {
      value: function () {
        var _self = this, deferred;
        if (!_self.$isLoaded) {
          _self.$isLoading = true;
          _self._loadingPromise = BaseModelApi.$query(_self.url);
          _self._loadingPromise.then(function (data) {
            _self.$isLoading = false;
            _self.$isLoaded = true;
            _.forEach(data, function (rawModel) {
              var model = new _self.ModelClass(rawModel);
              model.$onDeleted.addOnce(_deleteListener, _self);
              model.$isLoaded = true;
              model.$isStored = true;
              _self.add(model);
            });
            delete _self._loadingPromise;
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

    return BaseCollection;
  }

  function _saveListener(model) {
    this.push(model);
  }

  function _deleteListener(model) {
    var index = this.indexOf(model);
    this.splice(index, 1);
    model.$onSaved.removeAll();
    model.$onDeleted.removeAll();
  }

})(angular);
