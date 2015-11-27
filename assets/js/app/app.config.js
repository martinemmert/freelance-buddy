angular
  .module('app')
  .config(configRunner);

configRunner.inject = ['$logProvider'];

function configRunner($logProvider) {
  // enable logging
  $logProvider.debugEnabled(true);
}
