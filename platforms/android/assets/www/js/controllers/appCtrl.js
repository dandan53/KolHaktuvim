app.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  var shareSubject = "האפליקציה כל הכתובים זמינה עכשיו עבורך";
  var shareMessage = "אני משתמש באפליקציה כל הכתובים וחשבתי שהיא תהיה שימושית עבורך. נסה אותה על מכשיר האנדרויד שלך:";
  var shareLink = "https://play.google.com/store/apps/developer?id=RobertR&hl=en";

  $scope.shareApp = function(){
    //alert(shareSubject + " " + shareMessage + " " + shareLink);
     window.plugins.socialsharing.share(shareMessage, shareSubject, null, shareLink);
  };


});
