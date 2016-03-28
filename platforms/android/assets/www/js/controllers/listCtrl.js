app.controller('ListCtrl', function ($scope, $http, $state, $ionicLoading, personService) {

    $scope.show = function() {
    $ionicLoading.show({
      template: '<p>Loading...</p><ion-spinner></ion-spinner>'
    });
  };

  $scope.hide = function(){
        $ionicLoading.hide();
  };

    $scope.getPersonList = function (type) {

        // Start showing the progress
        $scope.show($ionicLoading);

        personService.getPersons(type)
                .then(
                    loadData,
                    function (errorMessage) {
                        console.warn(errorMessage);
                        alert(errorMessage);
                         // On both cases hide the loading
                        $scope.hide($ionicLoading);  
                    }
                );
            };

    function loadData(data) {
        $scope.persons = data;
         // On both cases hide the loading
      $scope.hide($ionicLoading);  
    }
   
    var currentState = $state.current.name; 
    var type = (currentState == 'app.refualist' ? 'refua' : 'ilui');
    $scope.getPersonList(type);
    
    $scope.title = (currentState == 'app.refualist' ? 'לרפואת' : 'לעילוי נשמת');

});