app.controller('EditPersonCtrl', function ($scope, $http, $state, $ionicPopup, personService) {

    $scope.submit = function () {

        if ($scope.newPerson.firstName != "" && $scope.newPerson.lastName != "" &&
                $scope.newPerson.mother != "" && $scope.newPerson.gender != "" &&
                $scope.newPerson.type != "") {

            var gender = ($scope.newPerson.gender == "male" ? "בן" : "בת");

            var person = $scope.newPerson.firstName + " " + $scope.newPerson.lastName + " " +
                gender + " " + $scope.newPerson.mother;
             
            $scope.listType = $scope.newPerson.type;

            if ($scope.type == 'add')
            {
                personService.addPerson(person, $scope.listType)
                .then(
                    loadData,
                    function (errorMessage) {
                        console.warn(errorMessage);
                    }
                );
            }
            else
            {
                personService.removePerson(person, $scope.listType)
                .then(
                    loadData,
                    function (errorMessage) {
                        console.warn(errorMessage);
                    }
                );
            }
        }
        else {
            alert('נא מלא את כל הפרטים');
        }
    };

    function loadData(data) {
        if (data != null) {
            $scope.showAlert();          
            $scope.initPerson();
        }
        else {
        }
    };

    $scope.alertTimeout = function () {
        $location.url('/');
    };

    $scope.alertDangrTimeout = function () {
        $scope.isAlertDanger = false;
    };


    // An alert dialog
     $scope.showAlert = function() {
       var alertPopup = $ionicPopup.alert({
         title: '!הפעולה התבצעה בהצלחה',
         //template: 'It might taste good'
       });

       alertPopup.then(function(res) {
         var state = (res == 'refua' ? 'app.refualist' : 'app.iluilist');
         $state.go(state);
         console.log('Thank you for not eating my delicious ice cream cone');
       });
     };


    $scope.initPerson = function () {
        $scope.newPerson = {};
        $scope.newPerson.firstName = "";
        $scope.newPerson.lastName = "";
        $scope.newPerson.mother = "";
        $scope.newPerson.gender = "";
        $scope.newPerson.type = "";
    };

    $scope.initPerson();

    var currentState = $state.current.name; 
    $scope.type = (currentState == 'app.add' ? 'add' : 'remove');
    $scope.title = (currentState == 'app.add' ? 'הוספת אדם לרשימות' : 'הסרת אדם מהרשימות');
    $scope.submitTitle = (currentState == 'app.add' ? 'הוספה' : 'הסרה');

});
