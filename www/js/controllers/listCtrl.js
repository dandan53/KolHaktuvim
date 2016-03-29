app.controller('ListCtrl', function ($scope, $http, $state, $ionicLoading, personService) {

    $scope.show = function() {
    /*$ionicLoading.show({
      template: '<p>...בטעינה</p><ion-spinner></ion-spinner>'
    });*/
  };

  $scope.hide = function(){
        $ionicLoading.hide();
  };

$scope.getPersonListMoq = function (type) {

  window.setTimeout(function() {
            

var data = [];
  for (var i = currentStart; i < currentStart+PAGA_SIZE; i++) {
      data.push("Item " + i)
    }

    if (currentStart == 30)
    {
      data = [];
    }

    lastPageSize = data.length;

    if (data != null && data.length > 0)
      {
          var count = data.length;

          for (var i = 0; i < count; i++) {
            $scope.persons.push(data[i]);
          }

          currentStart += count;
          //currentStart += PAGA_SIZE;
      }
      
      $scope.$broadcast('scroll.infiniteScrollComplete');

        }, 2000);    


}


    $scope.getPersonList = function (type) {

        // Start showing the progress
        //$scope.show($ionicLoading);

        personService.getPersons(type, currentStart, PAGA_SIZE)
                .then(
                    loadData,
                    function (errorMessage) {
                        console.warn(errorMessage);
                        alert(errorMessage);
                         
                        //$scope.hide($ionicLoading);  
                    }
                );
            };

    function loadData(data) {
     
      if (data != null && data.length > 0)
      {
          var count = data.length;

          for (var i = 0; i < count; i++) {
            $scope.persons.push(data[i]);
          }

          currentStart += count;
          //currentStart += PAGA_SIZE;

          lastPageSize = data.length;
      }
      else
      {
        lastPageSize = 0;
      }
      
      $scope.$broadcast('scroll.infiniteScrollComplete');

      //$scope.persons = data;
      //$scope.hide($ionicLoading);  
    }
   
    $scope.addPersons = function() {
      var currentState = $state.current.name; 
      var type = (currentState == 'app.refualist' ? 'refua' : 'ilui');
      $scope.getPersonList(type);
//      $scope.getPersonListMoq(type);      
    }

    $scope.morePersonsCanBeLoaded = function() {
         var retVal = (lastPageSize < PAGA_SIZE ? false : true);
         return retVal;
    }


    var currentState = $state.current.name; 
    var type = (currentState == 'app.refualist' ? 'refua' : 'ilui');   
    $scope.title = (currentState == 'app.refualist' ? 'לרפואת' : 'לעילוי נשמת');

    var PAGA_SIZE = 10;
    var currentStart = 0
    $scope.persons = [];
    var lastPageSize = PAGA_SIZE;

    //$scope.getPersonList(type);
});