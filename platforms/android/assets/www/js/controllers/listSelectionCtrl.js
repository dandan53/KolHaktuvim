app.controller('ListSelectionController', function ($scope, $state) {

    $scope.changeListType = function (type) {
       $state.go('tabs.list', { type: type });
    };

});