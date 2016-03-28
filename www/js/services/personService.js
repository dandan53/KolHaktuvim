app.service("personService", function ($http, $q) {

    //var url = "http://kolhaktuvimservice.apphb.com/";

    var url =  "http://localhost:61340/";

    // Return public API.
    return ({
      //  getBid: getBid,
       // updateBid: updateBid,
        getPersons: getPersons,
        addPerson: addPerson,
        removePerson: removePerson

        //removeFriend: removeFriend
    });


    // ---
    // PUBLIC METHODS.
    // ---

    function getPersons(type) {

        var request = $http({
            method: "get",
            url: url + "api/person?type=" + type //js/data.json", ///api/person",
            //params: {
            //    id: id
            //}
        });

        return (request.then(handleSuccess, handleError));
    }


    function addPerson(person, type) {

        var request = $http({
            method: "post",
            url: url + "api/person?person=" + person + "&&type=" + type
        });

        return (request.then(handleSuccess, handleError));

    }


     function removePerson(person, type) {

            var request = $http({
                method: "delete",
                url: url + "api/person?person=" + person + "&&type=" + type
            });

            return (request.then(handleSuccess, handleError));

    }
    
    // ---
    // PRIVATE METHODS.
    // ---


    // I transform the error response, unwrapping the application dta from
    // the API response payload.
    function handleError(response) {

        // The API response from the server should be returned in a
        // nomralized format. However, if the request was not handled by the
        // server (or what not handles properly - ex. server error), then we
        // may have to normalize it on our end, as best we can.
        if (
            !angular.isObject(response.data) ||
            !response.data.message
            ) {

            return ($q.reject("An unknown error occurred."));

        }

        // Otherwise, use expected error message.
        return ($q.reject(response.data.message));
    }


    // I transform the successful response, unwrapping the application data
    // from the API response payload.
    function handleSuccess(response) {

        return (response.data);

    }

}
        );
