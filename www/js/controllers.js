angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
})

.controller('PlaylistsCtrl', function($scope, API, $ionicModal, $sce) {

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
      console.log(video.id);
      $scope.url = $sce.trustAsResourceUrl('https://www.youtube.com/embed/' + video.id);
  };

  API.getMostPopularVideos().then(function (data) {
    $scope.videos = data.vid;
  });

  $scope.nextPage = function () {
    API.getMostPopularVideos($scope.nextToken).then(function (data) {
      $scope.videos = data.vid;
      $scope.nextToken = data.ntok;
      console.log($scope.nextToken);
    })
  };

  $scope.prevPage = function () {
    API.getMostPopularVideos($scope.prevToken).then(function (data) {
      $scope.videos = data.vid;
      $scope.prevToken = data.ptok;
      console.log($scope.prevToken)

    })
  };
});

