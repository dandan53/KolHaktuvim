app.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.shareSubject = "האפליקציה כל הכתובים זמינה עכשיו עבורך";
  $scope.shareMessage = "אני משתמש באפליקציה כל הכתובים וחשבתי שהיא תהיה שימושית עבורך. נסה אותה על מכשיר האנדרויד שלך:";
  $scope.shareLink = "https://play.google.com/store/search?q=%D7%AA%D7%A4%D7%99%D7%9C%D7%94&c=apps";

});
