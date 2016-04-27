app.controller('EditPersonCtrl', function ($scope, $http, $state, $ionicPopup, personService) {

    $scope.submit = function () {

        if ($scope.newPerson.firstName != "" && $scope.newPerson.lastName != "" &&
                $scope.newPerson.mother != "" && $scope.newPerson.gender != "" &&
                $scope.newPerson.type != "") {

            if ($scope.checkInput($scope.newPerson.firstName) &&
                $scope.checkInput($scope.newPerson.lastName) &&
                $scope.checkInput($scope.newPerson.mother)){

                var gender = ($scope.newPerson.gender == "male" ? "בן" : "בת");

                var person = $scope.newPerson.firstName + " " + $scope.newPerson.lastName + " " +
                    gender + " " + $scope.newPerson.mother;
                 
                $scope.listType = $scope.newPerson.type;

                $scope.submitted = true;
                
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
                            $scope.submitted = false;
                            console.warn(errorMessage);
                        }
                    );
                }
            }
            else
            {
                alert('יש להכניס אותיות בלבד');
            }
        }
        else {
            alert('נא מלא את כל הפרטים');
        }
    };

    function loadData(data) {
        $scope.submitted = false;
        if (data != null) {
            $scope.showAlert(data);          
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
     $scope.showAlert = function(data) {
        var title = "";

        switch(data) {
        case "Error":
            title = 'Error';
            break;
        case "PersonAdded":
            title = '!הפעולה התבצעה בהצלחה';
            break;
        case "PersonRemoved":
            title = '!הפעולה התבצעה בהצלחה';
            break;
        case "PersonExists":
            title = 'האדם כבר קיים ברשימה';
            break;
        case "PersonDoesntExist":
            title = 'האדם לא קיים ברשימה';
            break;
        }

       var alertPopup = $ionicPopup.alert({
         title: title,
         //template: 'It might taste good'
       });

       alertPopup.then(function(res) {
         
        if (data == "PersonAdded" || data == "PersonRemoved" || data == "PersonExists")
        {
            var state = ($scope.listType == 'refua' ? 'app.refualist' : 'app.iluilist');
            $state.go(state);

            $scope.initPerson();
        }         
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

    $scope.checkInput = function (inputtxt) {   

        var EnglishChars = /^[A-Za-z]+$/;  
        var HebrewChars = /^[\u0590-\u05FF]+$/;
        var chars = /\s|\-|\.|\_+$/g;

        inputtxt = inputtxt.replace(chars, "");

        var retVal = ((inputtxt.match(EnglishChars) || inputtxt.match(HebrewChars)) ? true : false);
        return retVal;  
    }; 


    $scope.initPerson();

    var currentState = $state.current.name; 
    $scope.type = (currentState == 'app.add' ? 'add' : 'remove');
    $scope.title = (currentState == 'app.add' ? 'הוספת אדם לרשימות' : 'הסרת אדם מהרשימות');
    $scope.submitTitle = (currentState == 'app.add' ? 'הוספה' : 'הסרה');
    $scope.submitted = false;
});
