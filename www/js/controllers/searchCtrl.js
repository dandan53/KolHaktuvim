app.controller('SearchCtrl', function ($scope, $http, $state, $ionicLoading, personService) {

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


    $scope.getPersonList = function (type, searchText) {

        // Start showing the progress
        //$scope.show($ionicLoading);

      personService.getPersons(type, currentStart, PAGA_SIZE, searchText)
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

          $scope.isEmptyState = false;
      }
      else
      {
        lastPageSize = 0;

        $scope.isEmptyState = true;
      }
      
      $scope.$broadcast('scroll.infiniteScrollComplete');

      //$scope.persons = data;
      //$scope.hide($ionicLoading);  
    }
   
    $scope.addPersons = function() {  
        if ($scope.searchText.length > 1 && currentStart > 0)
        {
          $scope.getPersonList(type, $scope.searchText);
        }
    }

    $scope.morePersonsCanBeLoaded = function() {
         var retVal = ((lastPageSize < PAGA_SIZE || $scope.searchText.length < 2) ? false : true);
         return retVal;
    }

    $scope.searchQueryChange = function() {
        if ($scope.searchText.length > 1)
        {
          currentStart = 0;
          $scope.persons = [];

          $scope.getPersonList(type, $scope.searchText);
        }
    };

    var type = "";
    var PAGA_SIZE = 10;
    var currentStart = 0
    $scope.persons = [];
    var lastPageSize = PAGA_SIZE;

    $scope.searchText = "";

    $scope.isEmptyState = false;

    //$scope.getPersonList(type);
});