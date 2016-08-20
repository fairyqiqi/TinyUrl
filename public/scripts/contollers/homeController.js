var app = angular.module('tinyurlApp');

app.controller("homeController", ["$scope", "$http", "$location", function ($scope, $http, $location) {
    $scope.submit = function () {
        $http.post("/api/v1/urls", {
                longUrl: $scope.longUrl
            })
            .success(function (response) {
                $location.path("/urls/" + response.shortUrl); // "/urls" is based on http://xxxx:xxx/#/
            });
    }
}]);