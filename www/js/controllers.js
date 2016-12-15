angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

})

.controller('PlaylistsCtrl', function($scope, API, $ionicModal) {

  $ionicModal.fromTemplateUrl('templates/video-modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });

    $scope.videos = [];
    $scope.openVideo = function (video) {
      $scope.open_video = video;
      $scope.modal.show();
      console.log(video);
  };
  API.getMostPopularVideos().then(function (data) {
    $scope.videos = data;
    console.log(data);
  });

})

.controller('PlaylistCtrl', function($scope, $stateParams) {
});

controller('OpenVideoController', function ($routeParams, $scope, $sce) {
  $scope.url = $sce.trustAsResourceUrl('https://www.youtube.com/embed/' + $routeParams.id)
});