angular
  .module("app")
  .run(runner);

runner.$inject = ['$log'];

function runner($log) {
  $log.info("Hello World!");
}

