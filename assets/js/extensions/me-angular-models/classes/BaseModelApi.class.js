(function (angular) {
  "use strict";

  angular
    .module('meNgModels')
    .config(['$classProvider', function ($classProvider) {
      $classProvider.register('BaseModelApi', BaseModelApiClassFactory);
    }]);

  BaseModelApiClassFactory.$inject = ['$log', '$http'];

  function BaseModelApiClassFactory($log, $http) {
    var BaseModelApi = function (url) {
      Object.defineProperty(this, 'url', {value: "/" + url});
    };

    BaseModelApi.prototype = Object.create({});
    BaseModelApi.prototype.constructor = BaseModelApi;

    Object.defineProperty(BaseModelApi, '$query', {
      value: function (url) {
        return $http
          .get(url)
          .then(function (response) {
            return response.data;
          })
          .catch(function (error) {
            $log.error("XHR failed for " + error.data);
          });
      }
    });

    Object.defineProperty(BaseModelApi.prototype, '$get', {
      value: function (id) {
        return $http
          .get(this.url + "/" + id)
          .then(function (response) {
            return response.data;
          }, function (error) {
            $log.warn("XHR failed because: " + error.data);
          })
      }
    });

    Object.defineProperty(BaseModelApi.prototype, '$save', {
      value: function (data) {
        return $http
          .post(this.url, data)
          .then(function (response) {
            return response.data;
          }, function (error) {
            $log.error("XHR failed for " + error.data);
            return null;
          });
      }
    });

    Object.defineProperty(BaseModelApi.prototype, '$update', {
      value: function (id, data) {
        return $http
          .put(this.url + "/" + id, data)
          .then(function (response) {
            return response.data;
          }, function (error) {
            $log.error("XHR failed for " + error.data);
            return error;
          });
      }
    });

    Object.defineProperty(BaseModelApi.prototype, '$delete', {
      value: function (id) {
        return $http
          .delete(this.url + "/" + id)
          .then(function (response) {
            return null;
          }, function (error) {
            $log.error("XHR failed for " + error.data);
            return error;
          });
      }
    });

    return BaseModelApi;
  }

})(angular);
